import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const chromeCandidates = [
  resolve(root, '..', 'node_modules', '.remotion', 'chrome-headless-shell', 'win64', 'chrome-headless-shell-win64', 'chrome-headless-shell.exe'),
  process.env.PROGRAMFILES ? join(process.env.PROGRAMFILES, 'Google', 'Chrome', 'Application', 'chrome.exe') : '',
  process.env['PROGRAMFILES(X86)'] ? join(process.env['PROGRAMFILES(X86)'], 'Microsoft', 'Edge', 'Application', 'msedge.exe') : '',
  process.env.LOCALAPPDATA ? join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe') : ''
];
const chrome = chromeCandidates.find(candidate => candidate && existsSync(candidate));
if (!chrome) throw new Error('Không tìm thấy Chrome hoặc Edge để chạy smoke test');
const profile = mkdtempSync(join(tmpdir(), 'kana-studio-smoke-'));
const pageUrl = pathToFileURL(resolve(root, 'index.html')).href;

const browser = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--allow-file-access-from-files',
  '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--window-size=390,844', pageUrl
], { stdio: ['ignore', 'ignore', 'pipe'] });

const sleep = ms => new Promise(resolvePromise => setTimeout(resolvePromise, ms));
let socket;

async function createClient() {
  const activePortFile = join(profile, 'DevToolsActivePort');
  for (let attempt = 0; attempt < 60 && !existsSync(activePortFile); attempt += 1) await sleep(100);
  if (!existsSync(activePortFile)) throw new Error('Trình duyệt không mở cổng kiểm thử DevTools');
  const [port, browserPath] = readFileSync(activePortFile, 'utf8').trim().split(/\r?\n/);
  socket = new WebSocket(`ws://127.0.0.1:${port}${browserPath}`);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener('open', resolveOpen, { once: true });
    socket.addEventListener('error', rejectOpen, { once: true });
  });
  let id = 0;
  const pending = new Map();
  socket.addEventListener('message', event => {
    const message = JSON.parse(String(event.data));
    if (!message.id || !pending.has(message.id)) return;
    const { resolve: done, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : done(message.result);
  });
  return {
    send(method, params = {}, sessionId) {
      const requestId = ++id;
      return new Promise((done, reject) => {
        pending.set(requestId, { resolve: done, reject });
        socket.send(JSON.stringify({ id: requestId, method, params, ...(sessionId ? { sessionId } : {}) }));
      });
    }
  };
}

async function run() {
  const client = await createClient();
  const targets = await client.send('Target.getTargets');
  const target = targets.targetInfos.find(item => item.type === 'page');
  if (!target) throw new Error('Chrome page target was not created');
  const attached = await client.send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
  const sessionId = attached.sessionId;
  const evaluate = async expression => {
    const result = await client.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };

  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate('document.readyState === "complete" && Boolean(window.KANA_DB)')) break;
    await sleep(100);
  }

  await evaluate(`
    localStorage.setItem('kana-known', JSON.stringify(['ぬ', 'め']));
    localStorage.setItem('kana-completed-lessons', JSON.stringify(['hira-vowels']));
    localStorage.removeItem('kana-mastery-schema');
    location.reload();
  `);
  await sleep(350);
  const legacyMasteryReset = await evaluate(`
    state.known.size === 0 &&
    state.completedLessons.size === 0 &&
    JSON.parse(localStorage.getItem('kana-known')).length === 0 &&
    localStorage.getItem('kana-mastery-schema') === 'final-assessment-v1'
  `);
  if (!legacyMasteryReset) throw new Error('Legacy learned data was not reset by the mastery migration');
  const emptyReviewState = await evaluate(`({
    navHidden: document.querySelector('#reviewNav').hidden,
    navDisabled: document.querySelector('#reviewNav').disabled,
    headingHidden: document.querySelector('#smartReviewHeading').hidden,
    stripHidden: document.querySelector('#homeWeakStrip').hidden
  })`);
  if (emptyReviewState.navHidden || !emptyReviewState.navDisabled || !emptyReviewState.headingHidden || !emptyReviewState.stripHidden) {
    throw new Error('Empty smart review did not keep its fifth navigation slot locked');
  }
  await evaluate("navigate('review')");
  if (!(await evaluate('document.querySelector("[data-screen=home]").classList.contains("active")'))) {
    throw new Error('Empty smart review route did not return to home');
  }
  const activeGroupGateWorks = await evaluate(`(() => {
    state.script = 'hiragana'; state.set = 'basic'; navigate('chart');
    document.querySelector('.kana-cell[data-char="か"]').click();
    const outsideGroupIsLocked = document.querySelector('#practiceCurrentChar').disabled;
    navigate('home');
    document.querySelector('.practice-nav').click();
    const practiceOpensCurrentGroup = state.activeLessonId === 'hira-vowels' && document.querySelector('[data-screen=lesson]').classList.contains('active');
    navigate('home');
    return outsideGroupIsLocked && practiceOpensCurrentGroup;
  })()`);
  if (!activeGroupGateWorks) throw new Error('Practice escaped the single active Kana group');
  await evaluate('document.querySelector("[data-action=start-lesson]").click()');
  if (!(await evaluate('document.querySelector("[data-screen=lesson]").classList.contains("active")'))) throw new Error('Lesson intro did not open');
  await evaluate('document.querySelector("#beginLesson").click()');
  const normalizationWorks = await evaluate("pronunciationMatches('ア') && pronunciationMatches('a') && !pronunciationMatches('さ') && pronunciationMatches('お', {char:'を', romaji:'wo'})");
  if (!normalizationWorks) throw new Error('Pronunciation normalization did not distinguish correct and incorrect readings');

  const expected = ['あ', 'い', 'う', 'え', 'お'];
  const strokeDatasetReady = await evaluate(`
    window.KANA_STROKES?.count === 176 &&
    window.KANA_STROKES.characters['あ'].strokeCount === 3 &&
    buildStrokeDemoSequence('きゃ').length > buildStrokeDemoSequence('き').length &&
    buildStrokeDemoSequence('ー').length === 1
  `);
  if (!strokeDatasetReady) throw new Error('Bundled Kana stroke-order dataset did not load');
  const thirdFailureReturnsToDemo = await evaluate(`(() => {
    window.KANA_DEMO_DURATION_MS = 5000;
    resetPracticeFailures();
    for (let attempt = 0; attempt < 3; attempt += 1) {
      showPracticeFailure('glyph-shape', 'Mặt chữ chưa đúng.');
      if (attempt === 0 && !document.querySelector('#modalTitle').textContent.includes('mặt chữ')) return false;
      document.querySelector('#modalOkay').click();
    }
    return state.route === 'stroke-demo' && state.practiceFailures === 0;
  })()`);
  if (!thirdFailureReturnsToDemo) throw new Error('Three consecutive failures did not return to the stroke-order demo');
  await evaluate(`navigate('character'); resetPracticeFailures();`);
  await evaluate(`
    window.__completeActiveDraw = async () => {
      const step = getActiveDrawItem();
      const candidates = getLesson().characters.map(item => item.char);
      const generatedStrokes = buildStrokeDemoSequence(step.char).map(stroke => stroke.points.map(point => ({ ...point })));
      testStrokes = generatedStrokes;
      document.querySelector('#testStrokeCount').textContent = String(generatedStrokes.length);
      document.querySelector('#submitDrawTest').disabled = false;
      drawBlankTestCanvas();
      const directRecognition = recognizeKanaDrawing(testStrokes, step.char, candidates);
      if (!directRecognition.correct) throw new Error('Template-shaped writing was rejected: ' + JSON.stringify({ expected:step.char, best:directRecognition.bestChar, score:directRecognition.score }));
      await submitDrawTest();
      const resultPresentationIsCorrect = state.drawMode === 'character'
        ? document.querySelector('#drawAnswer').hidden && !document.querySelector('#modalBackdrop').hidden && document.querySelector('#modalTitle').textContent.includes('Đã học được cách viết')
        : !document.querySelector('#drawAnswer').hidden;
      if (!resultPresentationIsCorrect || !lastRecognitionResult?.correct) throw new Error('Correct blank writing was not accepted');
      if (state.drawMode !== 'character') document.querySelector('#confirmDrawTest').click();
    };
  `);
  await evaluate('window.KANA_DEMO_DURATION_MS = 80; window.KANA_QUIZ_FEEDBACK_MS = 20');
  for (let index = 0; index < expected.length; index += 1) {
    const shown = await evaluate('document.querySelector("#characterTitle").textContent');
    if (shown !== expected[index]) throw new Error(`Expected ${expected[index]}, got ${shown}`);
    await evaluate(`
      document.querySelector('#practiceCurrentChar').click();
      if (!document.querySelector('[data-screen=pronounce]').classList.contains('active')) throw new Error('Pronunciation screen did not open');
      if (document.querySelector('#skipPronunciation').hidden) throw new Error('Pronunciation is expected to be skippable');
      if (!processRecognitionAlternatives([{ transcript: '${expected[index]}', confidence: .99 }])) throw new Error('Correct pronunciation was rejected');
      if (document.querySelector('#pronunciationContinue').disabled) throw new Error('Writing remained locked after correct pronunciation');
      document.querySelector('#pronunciationContinue').click();
    `);
    const lessonDemo = await evaluate(`({
      active: document.querySelector('[data-screen=stroke-demo]').classList.contains('active'),
      glyph: document.querySelector('#strokeDemoGlyph').textContent,
      expected: state.current.char,
      hasButton: Boolean(document.querySelector('[data-screen=stroke-demo] button') )
    })`);
    if (!lessonDemo.active || lessonDemo.glyph !== lessonDemo.expected || lessonDemo.hasButton) {
      throw new Error(`Stroke demo was not placed after pronunciation: ${JSON.stringify(lessonDemo)}`);
    }
    for (let attempt = 0; attempt < 30; attempt += 1) {
      if (await evaluate(`document.querySelector('[data-screen=quiz]').classList.contains('active') && state.quizMode === 'character-recognition'`)) break;
      await sleep(20);
    }
    await evaluate(`
      (() => {
      if (!document.querySelector('[data-screen=quiz]').classList.contains('active') || state.quizMode !== 'character-recognition') throw new Error('Stroke demo did not advance to the character-recognition quiz');
      const recognitionQuestion = activeQuizPool()[0];
      const allowed = new Set(getLesson().characters.map(item => item.romaji));
      if (recognitionQuestion.char !== state.current.char || recognitionQuestion.choices.some(choice => !allowed.has(choice))) throw new Error('Character-recognition quiz escaped the active Kana group');
      document.querySelector('.answer-button[data-answer="' + recognitionQuestion.answer + '"]').click();
      document.querySelector('#checkAnswer').click();
      })()
    `);
    await sleep(45);
    await evaluate(`
      (() => {
      if (!document.querySelector('[data-screen=write]').classList.contains('active')) throw new Error('Correct character recognition did not advance to guided writing');
      const expectedStrokes = buildStrokeDemoSequence(state.current.char).map(stroke => stroke.points.map(point => ({ ...point })));
      const correctOrder = assessStrokeOrder(expectedStrokes, state.current.char);
      const naturalVariation = expectedStrokes.map((stroke, strokeIndex) => stroke.filter((_, pointIndex) => pointIndex % 4 === 0 || pointIndex === stroke.length - 1).map((point, pointIndex) => ({ x: point.x * .88 + 34 + Math.sin(pointIndex) * 2, y: point.y * .88 + 27 + Math.cos(pointIndex + strokeIndex) * 2 })));
      const tolerantOrder = assessStrokeOrder(naturalVariation, state.current.char);
      const wrongOrder = assessStrokeOrder([...expectedStrokes].reverse(), state.current.char);
      const wrongDirection = assessStrokeOrder(expectedStrokes.map((stroke, strokeIndex) => strokeIndex ? stroke : [...stroke].reverse()), state.current.char);
      if (!correctOrder.correct || !tolerantOrder.correct || wrongOrder.correct || !['stroke-order','stroke-direction'].includes(wrongOrder.reason) || wrongDirection.correct || wrongDirection.reason !== 'stroke-direction') {
        throw new Error('Stroke-order classifier did not distinguish correct order, wrong order and wrong direction');
      }
      strokes = expectedStrokes;
      document.querySelector('#strokeCount').textContent = String(strokes.length);
      drawCanvas();
      document.querySelector('#checkWriting').click();
      })()
    `);
    const blankStage = await evaluate(`({
      active: document.querySelector('[data-screen=draw-test]').classList.contains('active'),
      mode: state.drawMode,
      label: document.querySelector('#drawTestEyebrow').textContent,
      counter: document.querySelector('#drawTestCounter').textContent,
      target: getActiveDrawItem()?.char,
      current: state.current.char
    })`);
    if (!blankStage.active || blankStage.mode !== 'character' || !blankStage.label.includes('Bước 5/5') || blankStage.counter !== '5/5' || blankStage.target !== blankStage.current) {
      throw new Error(`Unguided writing was not stage 5 for each character: ${JSON.stringify(blankStage)}`);
    }
    await evaluate('window.__completeActiveDraw()');
    const savedBeforeFinal = await evaluate(`({
      memory: state.known.size,
      storage: JSON.parse(localStorage.getItem('kana-known')).length
    })`);
    if (savedBeforeFinal.memory !== 0 || savedBeforeFinal.storage !== 0) {
      throw new Error(`Character was saved before the final assessment: ${JSON.stringify(savedBeforeFinal)}`);
    }
    const modalLabel = await evaluate('document.querySelector("#modalOkay").textContent');
    if (!modalLabel.includes(index === expected.length - 1 ? 'kiểm tra' : 'tiếp theo')) throw new Error(`Unexpected modal action: ${modalLabel}`);
    await evaluate('document.querySelector("#modalOkay").click()');
  }

  if (!(await evaluate('document.querySelector("[data-screen=quiz]").classList.contains("active")'))) throw new Error('Writing did not advance to quiz');
  if (!(await evaluate('state.known.size === 0 && !document.querySelector("#reviewNav").hidden && document.querySelector("#reviewNav").disabled'))) {
    throw new Error('Guided writing unlocked smart review before the final assessment');
  }

  const assessmentTypes = await evaluate('state.quizQuestions.map(step => step.type)');
  if (assessmentTypes.join(',') !== 'choice,draw,choice,draw,choice,draw,choice,draw') throw new Error(`Unexpected assessment order: ${assessmentTypes}`);
  const assessmentHasNoDuplicateChoices = await evaluate(`(() => {
    const current = state.quizQuestions;
    const choiceSteps = current.filter(step => step.type === 'choice');
    const drawSteps = current.filter(step => step.type === 'draw');
    const allowedAnswers = new Set(getLesson().characters.map(item => item.romaji));
    const currentUnique = new Set(choiceSteps.map(step => step.char)).size === choiceSteps.length &&
      choiceSteps.every(step => new Set(step.choices).size === step.choices.length && step.choices.every(choice => allowedAnswers.has(choice)));
    const smallLesson = buildLessonAssessment(getLesson('hira-y'));
    const smallChoices = smallLesson.filter(step => step.type === 'choice');
    const smallDraws = smallLesson.filter(step => step.type === 'draw');
    const noAdjacentSmallDuplicates = smallChoices.every((step, index) => !index || step.char !== smallChoices[index - 1].char) &&
      smallDraws.every((step, index) => !index || step.char !== smallDraws[index - 1].char);
    const smallAllowed = new Set(getLesson('hira-y').characters.map(item => item.romaji));
    const smallChoicesStayInGroup = smallChoices.every(step => step.choices.length === smallAllowed.size && step.choices.every(choice => smallAllowed.has(choice)));
    const everyLessonStaysInGroup = curriculum.every(lesson => {
      const allowed = new Set(lesson.characters.map(item => item.romaji));
      return buildLessonAssessment(lesson).filter(step => step.type === 'choice').every(step =>
        step.choices.length === Math.min(4, allowed.size) &&
        new Set(step.choices).size === step.choices.length &&
        step.choices.every(choice => allowed.has(choice))
      );
    });
    const noSameRoundPair = smallChoices.every((step, index) => step.char !== smallDraws[index].char);
    return currentUnique && noAdjacentSmallDuplicates && noSameRoundPair && smallChoicesStayInGroup && everyLessonStaysInGroup;
  })()`);
  if (!assessmentHasNoDuplicateChoices) throw new Error('Assessment generator produced duplicate multiple-choice questions or answers');
  await evaluate('window.KANA_QUIZ_FEEDBACK_MS = 20');
  const hasTestSkip = await evaluate("Boolean(document.querySelector('[data-screen=quiz] [id*=skip], [data-screen=draw-test] [id*=skip]'))");
  if (hasTestSkip) throw new Error('Only pronunciation may expose a skip action');
  const recognitionMatrix = await evaluate(`(() => {
    const chars = getLesson().characters.map(item => item.char);
    const scribble = [
      [{x:90,y:90},{x:320,y:320},{x:550,y:550}],
      [{x:550,y:90},{x:320,y:320},{x:90,y:550}]
    ];
    const box = [
      [{x:100,y:100},{x:320,y:100},{x:540,y:100}],
      [{x:540,y:100},{x:540,y:320},{x:540,y:540}],
      [{x:540,y:540},{x:320,y:540},{x:100,y:540}],
      [{x:100,y:540},{x:100,y:320},{x:100,y:100}]
    ];
    return chars.map(char => {
      const scribbleResult = recognizeKanaDrawing(scribble, char, chars);
      const boxResult = recognizeKanaDrawing(box, char, chars);
      return {
        char,
        templateAccepted: recognizeKanaMask(renderGlyphMask(char), char, chars).correct,
        scribbleRejected: !scribbleResult.correct,
        boxRejected: !boxResult.correct,
        scribbleBest: scribbleResult.bestChar,
        scribbleScore: scribbleResult.score,
        scribbleMargin: scribbleResult.margin
      };
    });
  })()`);
  if (!recognitionMatrix.every(item => item.templateAccepted && item.scribbleRejected && item.boxRejected)) {
    throw new Error(`Handwriting recognition matrix failed: ${JSON.stringify(recognitionMatrix)}`);
  }
  for (let index = 0; index < 8; index += 1) {
    const type = await evaluate('state.quizQuestions[state.quizIndex].type');
    if (type === 'choice') {
      await evaluate(`
        (() => {
          const question = activeQuizPool()[state.quizIndex];
          document.querySelector('.answer-button[data-answer="' + question.answer + '"]').click();
          document.querySelector('#checkAnswer').click();
        })()
      `);
      await sleep(45);
    } else {
      await evaluate(`
        (async () => {
          if (document.querySelector('[data-screen=stroke-demo]').classList.contains('active')) throw new Error('Stroke demo was duplicated inside the final assessment');
          if (!document.querySelector('[data-screen=draw-test]').classList.contains('active')) throw new Error('Draw test screen did not open');
          if (state.drawMode !== 'assessment') throw new Error('Final assessment draw step used the per-character mode');
          if (!document.querySelector('#drawAnswer').hidden) throw new Error('Answer was visible before drawing');
          const step = state.quizQuestions[state.quizIndex];
          const candidates = getLesson().characters.map(item => item.char);

          if (!window.__recognitionNegativeChecked) {
            testStrokes = [
              [{x:90,y:90},{x:320,y:320},{x:550,y:550}],
              [{x:550,y:90},{x:320,y:320},{x:90,y:550}]
            ];
            document.querySelector('#submitDrawTest').disabled = false;
            drawBlankTestCanvas();
            await submitDrawTest();
            if (lastRecognitionResult?.correct || !document.querySelector('#drawAnswer').hidden || !document.querySelector('#writingRecognition').classList.contains('is-error')) {
              throw new Error('A random X scribble passed handwriting recognition');
            }
            document.querySelector('#modalOkay').click();
            window.__recognitionNegativeChecked = true;
            resetDrawTest();
          }

          const strokes = buildStrokeDemoSequence(step.char).map(stroke => stroke.points.map(point => ({ ...point })));
          testStrokes = strokes;
          document.querySelector('#testStrokeCount').textContent = String(strokes.length);
          document.querySelector('#submitDrawTest').disabled = false;
          drawBlankTestCanvas();
          const directRecognition = recognizeKanaDrawing(testStrokes, step.char, candidates);
          if (!directRecognition.correct) throw new Error('Template-shaped writing was rejected: ' + JSON.stringify({ expected:step.char, best:directRecognition.bestChar, score:directRecognition.score, ranked:directRecognition.ranked }));
          await submitDrawTest();
          if (document.querySelector('#drawAnswer').hidden) throw new Error('Answer was not revealed after drawing');
          if (!lastRecognitionResult?.correct || !document.querySelector('#writingRecognition').classList.contains('is-success')) throw new Error('Recognition success state was not shown');
          document.querySelector('#confirmDrawTest').click();
        })()
      `);
    }
    if (index < 7 && !(await evaluate(`state.known.size === 0 && JSON.parse(localStorage.getItem('kana-known')).length === 0`))) {
      throw new Error(`Mastery was persisted before assessment step 8 (after step ${index + 1})`);
    }
  }

  if (!(await evaluate('document.querySelector("[data-screen=complete]").classList.contains("active")'))) throw new Error('Quiz did not advance to completion');
  const saved = await evaluate('JSON.parse(localStorage.getItem("kana-completed-lessons")).includes("hira-vowels")');
  if (!saved) throw new Error('Completed lesson was not persisted');
  const masteredAfterFinal = await evaluate(`({
    memory: [...state.known].sort(),
    storage: JSON.parse(localStorage.getItem('kana-known')).sort()
  })`);
  if (masteredAfterFinal.memory.join('') !== expected.slice().sort().join('') || masteredAfterFinal.storage.join('') !== expected.slice().sort().join('')) {
    throw new Error(`Final assessment did not persist exactly its five characters: ${JSON.stringify(masteredAfterFinal)}`);
  }
  const streak = await evaluate('JSON.parse(localStorage.getItem("kana-study-streak"))');
  if (streak.count !== 1 || !streak.lastStudyDate) throw new Error('Study streak was not recorded from zero');
  const sameDayCount = await evaluate('recordStudyDay(); JSON.parse(localStorage.getItem("kana-study-streak")).count');
  if (sameDayCount !== 1) throw new Error('Study streak increased more than once in the same day');
  const reviewChecks = await evaluate(`(() => {
    const navVisible = !document.querySelector('#reviewNav').hidden && !document.querySelector('#reviewNav').disabled;
    navigate('review');
    const rendered = [...document.querySelectorAll('#reviewStack span, #reviewFocusList [data-review-char]')]
      .map(node => node.dataset.reviewChar || node.textContent.trim());
    const renderedOnlyKnown = rendered.every(char => state.known.has(char));
    const pairsOnlyKnown = [...document.querySelectorAll('#reviewFocusList [data-compare]')]
      .every(node => node.dataset.compare.split(',').every(char => state.known.has(char)));
    startSmartReview();
    const questionsOnlyKnown = state.quizQuestions.length > 0 && state.quizQuestions.every(question => state.known.has(question.char));
    return { navVisible, renderedOnlyKnown, pairsOnlyKnown, questionsOnlyKnown };
  })()`);
  if (!Object.values(reviewChecks).every(Boolean)) throw new Error(`Smart review filter failed: ${JSON.stringify(reviewChecks)}`);

  const responsiveViewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone XS', width: 375, height: 812 },
    { name: 'iPhone SE 1st gen', width: 320, height: 568 }
  ];
  for (const viewport of responsiveViewports) {
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: true
    }, sessionId);
    const layout = await evaluate(`(async () => {
      navigate('home');
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const navButtons = [...document.querySelectorAll('.bottom-nav > button:not([hidden])')];
      const navLabels = navButtons.map(button => button.textContent.trim());
      const navFits = navButtons.every(button => {
        const rect = button.getBoundingClientRect();
        return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
      });
      const practiceLabel = document.querySelector('.practice-label');
      const practiceVisible = practiceLabel && practiceLabel.getBoundingClientRect().width > 0 && practiceLabel.textContent.trim() === 'Học tập';
      const practiceButton = document.querySelector('.practice-nav');
      const practiceMark = document.querySelector('.practice-mark');
      const practiceRect = practiceButton.getBoundingClientRect();
      const markRect = practiceMark.getBoundingClientRect();
      const labelRect = practiceLabel.getBoundingClientRect();
      const practicePartsSeparated = markRect.bottom <= labelRect.top &&
        markRect.left >= practiceRect.left && markRect.right <= practiceRect.right &&
        labelRect.left >= practiceRect.left && labelRect.right <= practiceRect.right;
      const buttonRects = navButtons.map(button => button.getBoundingClientRect()).sort((a, b) => a.left - b.left);
      const buttonsSeparated = buttonRects.every((rect, index) => index === buttonRects.length - 1 || rect.right <= buttonRects[index + 1].left);

      const checks = [
        ['lesson', '#beginLesson'],
        ['character', '#practiceCurrentChar'],
        ['pronounce', '#skipPronunciation'],
        ['write', '#checkWriting'],
        ['quiz', '#checkAnswer'],
        ['stroke-demo', '#strokeDemoCanvas'],
        ['draw-test', '#submitDrawTest']
      ];
      const focusedScreens = [];
      state.lessonMode = true;
      state.activeLessonId = 'hira-vowels';
      state.current = getLesson().characters[0];
      state.quizMode = 'lesson';
      state.quizQuestions = buildLessonAssessment(getLesson());
      state.drawMode = 'assessment';
      window.KANA_DEMO_DURATION_MS = 5000;
      for (const [route, selector] of checks) {
        state.quizIndex = route === 'draw-test' ? 1 : 0;
        navigate(route);
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const control = document.querySelector(selector);
        const rect = control?.getBoundingClientRect();
        focusedScreens.push({
          route,
          reachable: Boolean(rect && rect.top < innerHeight && rect.bottom <= innerHeight && rect.right <= innerWidth),
          navHidden: getComputedStyle(document.querySelector('.bottom-nav')).display === 'none',
          noHorizontalOverflow: document.documentElement.scrollWidth <= innerWidth
        });
      }
      return {
        navFits,
        practiceVisible,
        practicePartsSeparated,
        buttonsSeparated,
        navLabels,
        noHorizontalOverflow: document.documentElement.scrollWidth <= innerWidth,
        focusedScreens
      };
    })()`);
    const focusedOkay = layout.focusedScreens.every(screen => screen.reachable && screen.navHidden && screen.noHorizontalOverflow);
    if (!layout.navFits || !layout.practiceVisible || !layout.practicePartsSeparated || !layout.buttonsSeparated || !layout.noHorizontalOverflow || !focusedOkay) {
      throw new Error(`${viewport.name} responsive failure: ${JSON.stringify(layout)}`);
    }
  }
  console.log('PASS: five-stage grouped learning; stroke order and direction checks; three failures review strokes; final mastery');
}

try {
  await run();
} finally {
  socket?.close();
  browser.kill();
  await sleep(300);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 });
  } catch (_) {
    // Windows can retain Chrome profile locks briefly after a successful run.
  }
}
