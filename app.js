const row = (chars, romaji, label) => Array.from(chars).map((char, i) => ({ char, romaji: romaji[i], row: label }));

const kana = {
  hiragana: {
    basic: [
      ...row('あいうえお', ['a','i','u','e','o'], 'Nguyên âm'),
      ...row('かきくけこ', ['ka','ki','ku','ke','ko'], 'Hàng K'),
      ...row('さしすせそ', ['sa','shi','su','se','so'], 'Hàng S'),
      ...row('たちつてと', ['ta','chi','tsu','te','to'], 'Hàng T'),
      ...row('なにぬねの', ['na','ni','nu','ne','no'], 'Hàng N'),
      ...row('はひふへほ', ['ha','hi','fu','he','ho'], 'Hàng H'),
      ...row('まみむめも', ['ma','mi','mu','me','mo'], 'Hàng M'),
      ...row('やゆよ', ['ya','yu','yo'], 'Hàng Y'),
      ...row('らりるれろ', ['ra','ri','ru','re','ro'], 'Hàng R'),
      ...row('わをん', ['wa','wo','n'], 'Hàng W / N')
    ],
    voiced: [
      ...row('がぎぐげご', ['ga','gi','gu','ge','go'], 'Hàng G'),
      ...row('ざじずぜぞ', ['za','ji','zu','ze','zo'], 'Hàng Z'),
      ...row('だぢづでど', ['da','ji','zu','de','do'], 'Hàng D'),
      ...row('ばびぶべぼ', ['ba','bi','bu','be','bo'], 'Hàng B'),
      ...row('ぱぴぷぺぽ', ['pa','pi','pu','pe','po'], 'Hàng P')
    ],
    combo: [
      ...row(['きゃ','きゅ','きょ'], ['kya','kyu','kyo'], 'Âm ghép K'),
      ...row(['しゃ','しゅ','しょ'], ['sha','shu','sho'], 'Âm ghép S'),
      ...row(['ちゃ','ちゅ','ちょ'], ['cha','chu','cho'], 'Âm ghép T'),
      ...row(['にゃ','にゅ','にょ'], ['nya','nyu','nyo'], 'Âm ghép N'),
      ...row(['ひゃ','ひゅ','ひょ'], ['hya','hyu','hyo'], 'Âm ghép H'),
      ...row(['みゃ','みゅ','みょ'], ['mya','myu','myo'], 'Âm ghép M'),
      ...row(['りゃ','りゅ','りょ'], ['rya','ryu','ryo'], 'Âm ghép R'),
      ...row(['ぎゃ','ぎゅ','ぎょ'], ['gya','gyu','gyo'], 'Âm ghép G'),
      ...row(['じゃ','じゅ','じょ'], ['ja','ju','jo'], 'Âm ghép J'),
      ...row(['びゃ','びゅ','びょ'], ['bya','byu','byo'], 'Âm ghép B'),
      ...row(['ぴゃ','ぴゅ','ぴょ'], ['pya','pyu','pyo'], 'Âm ghép P')
    ],
    marks: row(['っ','ゃ','ゅ','ょ','ぁ','ぃ','ぅ','ぇ','ぉ','ゎ'], ['tsu nhỏ','ya nhỏ','yu nhỏ','yo nhỏ','a nhỏ','i nhỏ','u nhỏ','e nhỏ','o nhỏ','wa nhỏ'], 'Kana nhỏ')
  },
  katakana: {
    basic: [
      ...row('アイウエオ', ['a','i','u','e','o'], 'Nguyên âm'),
      ...row('カキクケコ', ['ka','ki','ku','ke','ko'], 'Hàng K'),
      ...row('サシスセソ', ['sa','shi','su','se','so'], 'Hàng S'),
      ...row('タチツテト', ['ta','chi','tsu','te','to'], 'Hàng T'),
      ...row('ナニヌネノ', ['na','ni','nu','ne','no'], 'Hàng N'),
      ...row('ハヒフヘホ', ['ha','hi','fu','he','ho'], 'Hàng H'),
      ...row('マミムメモ', ['ma','mi','mu','me','mo'], 'Hàng M'),
      ...row('ヤユヨ', ['ya','yu','yo'], 'Hàng Y'),
      ...row('ラリルレロ', ['ra','ri','ru','re','ro'], 'Hàng R'),
      ...row('ワヲン', ['wa','wo','n'], 'Hàng W / N')
    ],
    voiced: [
      ...row('ガギグゲゴ', ['ga','gi','gu','ge','go'], 'Hàng G'),
      ...row('ザジズゼゾ', ['za','ji','zu','ze','zo'], 'Hàng Z'),
      ...row('ダヂヅデド', ['da','ji','zu','de','do'], 'Hàng D'),
      ...row('バビブベボ', ['ba','bi','bu','be','bo'], 'Hàng B'),
      ...row('パピプペポ', ['pa','pi','pu','pe','po'], 'Hàng P')
    ],
    combo: [
      ...row(['キャ','キュ','キョ'], ['kya','kyu','kyo'], 'Âm ghép K'),
      ...row(['シャ','シュ','ショ'], ['sha','shu','sho'], 'Âm ghép S'),
      ...row(['チャ','チュ','チョ'], ['cha','chu','cho'], 'Âm ghép T'),
      ...row(['ニャ','ニュ','ニョ'], ['nya','nyu','nyo'], 'Âm ghép N'),
      ...row(['ヒャ','ヒュ','ヒョ'], ['hya','hyu','hyo'], 'Âm ghép H'),
      ...row(['ミャ','ミュ','ミョ'], ['mya','myu','myo'], 'Âm ghép M'),
      ...row(['リャ','リュ','リョ'], ['rya','ryu','ryo'], 'Âm ghép R'),
      ...row(['ギャ','ギュ','ギョ'], ['gya','gyu','gyo'], 'Âm ghép G'),
      ...row(['ジャ','ジュ','ジョ'], ['ja','ju','jo'], 'Âm ghép J'),
      ...row(['ビャ','ビュ','ビョ'], ['bya','byu','byo'], 'Âm ghép B'),
      ...row(['ピャ','ピュ','ピョ'], ['pya','pyu','pyo'], 'Âm ghép P')
    ],
    marks: row(['ッ','ャ','ュ','ョ','ァ','ィ','ゥ','ェ','ォ','ヮ','ー','ヴ'], ['tsu nhỏ','ya nhỏ','yu nhỏ','yo nhỏ','a nhỏ','i nhỏ','u nhỏ','e nhỏ','o nhỏ','wa nhỏ','âm dài','vu'], 'Ký hiệu Katakana')
  }
};

const curriculum = window.KANA_DB.curriculum;

const examples = {
  a: ['あめ', 'ame', 'mưa'], i: ['いぬ', 'inu', 'con chó'], u: ['うみ', 'umi', 'biển'], e: ['えき', 'eki', 'nhà ga'], o: ['おちゃ', 'ocha', 'trà'],
  ka: ['かさ', 'kasa', 'cái ô'], ki: ['き', 'ki', 'cây'], ku: ['くも', 'kumo', 'mây'], ke: ['けさ', 'kesa', 'sáng nay'], ko: ['こえ', 'koe', 'giọng nói'],
  sa: ['さかな', 'sakana', 'con cá'], shi: ['しま', 'shima', 'hòn đảo'], su: ['すし', 'sushi', 'sushi'], se: ['せかい', 'sekai', 'thế giới'], so: ['そら', 'sora', 'bầu trời'],
  ta: ['たこ', 'tako', 'bạch tuộc'], chi: ['ちず', 'chizu', 'bản đồ'], tsu: ['つき', 'tsuki', 'mặt trăng'], te: ['て', 'te', 'bàn tay'], to: ['とり', 'tori', 'con chim'],
  na: ['なつ', 'natsu', 'mùa hè'], ni: ['にく', 'niku', 'thịt'], nu: ['ぬの', 'nuno', 'vải'], ne: ['ねこ', 'neko', 'con mèo'], no: ['のり', 'nori', 'rong biển'],
  ha: ['はな', 'hana', 'bông hoa'], hi: ['ひと', 'hito', 'người'], fu: ['ふね', 'fune', 'con thuyền'], he: ['へや', 'heya', 'căn phòng'], ho: ['ほし', 'hoshi', 'ngôi sao'],
  ma: ['まど', 'mado', 'cửa sổ'], mi: ['みみ', 'mimi', 'tai'], mu: ['むし', 'mushi', 'côn trùng'], me: ['め', 'me', 'mắt'], mo: ['もり', 'mori', 'rừng'],
  ya: ['やま', 'yama', 'núi'], yu: ['ゆき', 'yuki', 'tuyết'], yo: ['よる', 'yoru', 'ban đêm'], ra: ['らく', 'raku', 'thoải mái'], ri: ['りす', 'risu', 'sóc'], ru: ['るす', 'rusu', 'vắng nhà'], re: ['れきし', 'rekishi', 'lịch sử'], ro: ['ろく', 'roku', 'số sáu'], wa: ['わに', 'wani', 'cá sấu'], wo: ['を', 'wo', 'trợ từ'], n: ['ほん', 'hon', 'sách']
};

const mnemonics = {
  a: 'Một quả <b>táo</b> có cuống xoắn.', i: 'Hai nét đứng giống hai chữ <b>i</b> cạnh nhau.', u: 'Một cái miệng đang nói âm <b>u</b>.',
  e: 'Một người đang chạy thật <b>êm</b>.', o: 'Nhìn như người chơi <b>ô</b> ăn quan.', ka: 'Một chiếc <b>ca</b> có quai cong và một nét chéo.',
  ki: 'Một chiếc <b>key</b> — chìa khóa có nhiều răng.', ku: 'Cái mỏ chim đang kêu <b>ku</b>.', ke: 'Một chiếc <b>kê</b> nhỏ có ba chân.',
  ko: 'Hai nét ngang như hai con <b>cò</b> bay.', sa: 'Một người đang cầm <b>sa</b>o giấy.', shi: 'Một sợi dây cong như lưỡi câu, đọc <b>shi</b>.',
  su: 'Một vòng xoắn như đang viết chữ <b>su</b>.', se: 'Một nút thắt trông như chữ <b>se</b>.', so: 'Một đường zigzag rơi xuống như sợi <b>sô</b>côla.'
};

// One-time migration: earlier builds marked characters as known during guided
// writing. Reset that legacy mastery so only a completed final assessment can
// unlock and persist a lesson from this version onward.
const MASTERY_SCHEMA_VERSION = 'final-assessment-v1';
if (localStorage.getItem('kana-mastery-schema') !== MASTERY_SCHEMA_VERSION) {
  localStorage.removeItem('kana-known');
  localStorage.removeItem('kana-completed-lessons');
  localStorage.removeItem('kana-active-lesson');
  localStorage.setItem('kana-mastery-schema', MASTERY_SCHEMA_VERSION);
}

const state = {
  route: 'home', script: 'hiragana', set: 'basic', sound: true,
  current: { char: 'あ', romaji: 'a', row: 'Nguyên âm' },
  activeLessonId: 'hira-vowels', lessonCharIndex: 0, lessonMode: false,
  quizIndex: 0, selectedAnswer: null, quizLocked: false, quizMode: 'free', quizQuestions: [], quizCorrect: 0,
  drawMode: 'assessment',
  practiceFailures: 0, practiceFailureKey: null, strokeDemoResumeRoute: null,
  known: new Set(JSON.parse(localStorage.getItem('kana-known') || '[]')),
  learning: new Set(),
  completedLessons: new Set(JSON.parse(localStorage.getItem('kana-completed-lessons') || '[]')),
  streak: (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('kana-study-streak') || 'null');
      return saved && Number.isInteger(saved.count) ? saved : { count: 0, lastStudyDate: null };
    } catch (_) { return { count: 0, lastStudyDate: null }; }
  })()
};

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
let quizAdvanceTimer = 0;

function navigate(route) {
  if (route === 'review' && getKnownItems().length === 0) route = 'home';
  if (state.route === 'pronounce' && route !== 'pronounce') activeRecognition?.abort?.();
  if (state.route === 'stroke-demo' && route !== 'stroke-demo') cancelStrokeDemo();
  if (state.route === 'quiz' && route !== 'quiz' && quizAdvanceTimer) {
    clearTimeout(quizAdvanceTimer);
    quizAdvanceTimer = 0;
  }
  state.route = route;
  $$('.screen').forEach(screen => screen.classList.toggle('active', screen.dataset.screen === route));
  $$('.bottom-nav > button').forEach(button => button.classList.toggle('active', button.dataset.route === route));
  const isFocused = ['lesson', 'character', 'pronounce', 'write', 'quiz', 'stroke-demo', 'draw-test', 'complete'].includes(route);
  $('.bottom-nav').style.display = isFocused ? 'none' : 'grid';
  if (route === 'home') renderHome();
  if (route === 'lesson') renderLessonIntro();
  if (route === 'chart') renderChart();
  if (route === 'character') renderCharacter();
  if (route === 'pronounce') setupPronunciation();
  if (route === 'write') setupCanvas();
  if (route === 'quiz') renderQuiz();
  if (route === 'stroke-demo') setupStrokeDemo();
  if (route === 'draw-test') setupDrawTest();
  if (route === 'review') renderReview();
  if (route === 'profile') renderProfile();
  if (route === 'complete') renderCompletion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => $('#main').focus({ preventScroll: true }), 30);
}

function getLesson(id = state.activeLessonId) {
  return curriculum.find(lesson => lesson.id === id) || curriculum[0];
}

function studyDayKey(offsetDays = 0) {
  const date = new Date(Date.now() + offsetDays * 86400000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

function renderStreak() {
  $('#streakValue').textContent = state.streak.count;
  $('#streakStat').textContent = `${state.streak.count} ngày`;
}

function recordStudyDay() {
  const today = studyDayKey();
  if (state.streak.lastStudyDate === today) return renderStreak();
  state.streak.count = state.streak.lastStudyDate === studyDayKey(-1) ? state.streak.count + 1 : 1;
  state.streak.lastStudyDate = today;
  localStorage.setItem('kana-study-streak', JSON.stringify(state.streak));
  renderStreak();
}

function getNextLesson() {
  return curriculum.find(lesson => !state.completedLessons.has(lesson.id)) || curriculum[curriculum.length - 1];
}

function lessonIndexOf(id) { return curriculum.findIndex(lesson => lesson.id === id); }

function startLesson(id) {
  const lesson = getLesson(id || getNextLesson().id);
  const shouldResume = state.lessonMode && state.activeLessonId === lesson.id && !state.completedLessons.has(lesson.id);
  state.activeLessonId = lesson.id;
  if (!shouldResume) state.lessonCharIndex = 0;
  state.lessonMode = true;
  state.script = lesson.script;
  state.set = lesson.set;
  state.current = lesson.characters[state.lessonCharIndex];
  resetPracticeFailures();
  state.strokeDemoResumeRoute = null;
  lesson.characters.forEach(item => state.learning.add(item.char));
  saveLearningState();
  navigate('lesson');
}

function renderHome() {
  const lesson = getNextLesson();
  const index = lessonIndexOf(lesson.id);
  const isResume = state.activeLessonId === lesson.id && state.lessonMode && state.lessonCharIndex > 0;
  $('#homeLessonKicker').textContent = `${isResume ? 'Đang học' : 'Bài tiếp theo'} · ${lesson.characters.length + 3} phút`;
  $('#homeLessonTitle').textContent = `${lesson.title} — ${lesson.characters.map(item => item.char).join(' ')}`;
  $('#homeLessonDescription').textContent = lesson.subtitle;
  $('#homeLessonButton').textContent = isResume ? 'Học tiếp' : index === 0 ? 'Bắt đầu từ đây' : 'Bắt đầu học';
  $('#homeHeroKana').textContent = lesson.characters[0].char;
  $('#homeHeroRomaji').textContent = lesson.characters[0].romaji;
  const overallPercent = Math.round((state.completedLessons.size / curriculum.length) * 100);
  $('#overallProgressValue').textContent = overallPercent;
  $('.level-ring').style.background = `conic-gradient(var(--green) ${overallPercent}%, var(--paper-deep) 0)`;

  const visibleLessons = curriculum.slice(Math.max(0, index - 1), Math.min(curriculum.length, index + 4));
  $('#pathHeading').textContent = lesson.script === 'hiragana' ? 'Hiragana từ đầu' : 'Katakana từ đầu';
  $('#pathList').innerHTML = visibleLessons.map(item => {
    const itemIndex = lessonIndexOf(item.id);
    const done = state.completedLessons.has(item.id);
    const current = item.id === lesson.id;
    const locked = itemIndex > index;
    const progress = current && state.lessonMode ? Math.min(state.lessonCharIndex, item.characters.length) : 0;
    const statusClass = done ? 'done' : current ? 'current' : 'locked';
    const icon = done ? '✓' : current ? item.characters[0].char : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10V8a5 5 0 0 1 10 0v2h1v10H6V10h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z"/></svg>';
    const small = done ? item.characters.map(char => char.char).join('・') : current ? `${progress ? `Đang học · ${progress}/${item.characters.length}` : item.subtitle}` : `Hoàn thành ${curriculum[itemIndex - 1]?.title || 'bài trước'} để mở`;
    return `<button class="path-item ${statusClass}" data-lesson-id="${item.id}" ${locked ? 'disabled' : ''}><span class="path-icon">${icon}</span><span class="path-copy"><b>${item.title}</b><small>${small}</small></span>${done ? `<span class="score">${item.characters.length}/${item.characters.length}</span>` : current ? `<span class="score">${Math.round(progress/item.characters.length*100)}%</span>` : ''}</button>`;
  }).join('');
  $$('[data-lesson-id]', $('#pathList')).forEach(button => button.addEventListener('click', () => startLesson(button.dataset.lessonId)));
}

function renderProfile() {
  const scriptStats = ['hiragana', 'katakana'].map(script => {
    const allChars = Object.values(kana[script]).flat().map(item => item.char);
    const known = allChars.filter(char => state.known.has(char)).length;
    return { script, known, total: allChars.length, percent: Math.round(known / allChars.length * 100) };
  });
  const hira = scriptStats[0], kata = scriptStats[1];
  $('#hiraProgressText').textContent = `${hira.known} trên ${hira.total} tổ hợp`;
  $('#hiraProgressBar').style.width = `${hira.percent}%`;
  $('#hiraProgressPercent').textContent = `${hira.percent}%`;
  $('#kataProgressText').textContent = `${kata.known} trên ${kata.total} tổ hợp`;
  $('#kataProgressBar').style.width = `${kata.percent}%`;
  $('#kataProgressPercent').textContent = `${kata.percent}%`;
}

function renderLessonIntro() {
  const lesson = getLesson();
  const index = lessonIndexOf(lesson.id);
  $('#lessonNumber').textContent = `Bài ${index + 1}`;
  $('#lessonSeal').textContent = ['一','二','三','四','五','六','七','八','九','十'][index % 10];
  $('#lessonIntroTitle').textContent = lesson.title;
  $('#lessonIntroDescription').textContent = `${lesson.subtitle}. Mỗi chữ đi qua 5 bước: phát âm, xem thứ tự nét, nhận mặt chữ, viết có mẫu và viết không mẫu.`;
  $('#lessonCharacterTrack').innerHTML = lesson.characters.map((item, charIndex) => `<button class="lesson-char ${charIndex < state.lessonCharIndex ? 'done' : charIndex === state.lessonCharIndex ? 'current' : ''}" data-char-index="${charIndex}" ${charIndex > state.lessonCharIndex ? 'disabled' : ''}><b>${item.char}</b><small>${item.romaji}</small></button>`).join('');
  $$('[data-char-index]', $('#lessonCharacterTrack')).forEach(button => button.addEventListener('click', () => {
    state.lessonCharIndex = Number(button.dataset.charIndex); state.current = lesson.characters[state.lessonCharIndex]; navigate('character');
  }));
  $('#beginLesson').innerHTML = `${state.lessonCharIndex ? 'Tiếp tục với' : 'Học chữ đầu tiên'} ${lesson.characters[state.lessonCharIndex].char} <span>→</span>`;
}

function renderChart() {
  const grid = $('#kanaGrid');
  const items = kana[state.script][state.set];
  grid.classList.toggle('combo-grid', state.set === 'combo');
  grid.innerHTML = items.map(item => {
    const progress = state.known.has(item.char) ? 'learned' : state.learning.has(item.char) ? 'learning' : '';
    return `<button class="kana-cell ${progress}" data-char="${item.char}" aria-label="${item.char}, ${item.romaji}"><b>${item.char}</b><small>${item.romaji}</small></button>`;
  }).join('');
  $$('.kana-cell', grid).forEach(button => button.addEventListener('click', () => {
    const item = items.find(entry => entry.char === button.dataset.char);
    state.current = item;
    state.lessonMode = false;
    navigate('character');
  }));
}

function renderCharacter() {
  const item = state.current;
  const lesson = getLesson();
  $('#characterTitle').textContent = item.char;
  $('#charFamily').textContent = `${state.script === 'hiragana' ? 'Hiragana' : 'Katakana'} · ${item.row}`;
  $('#charStatus').textContent = state.lessonMode ? `${state.lessonCharIndex + 1}/${lesson.characters.length}` : state.known.has(item.char) ? 'Đã thuộc' : 'Đang học';
  $('#speakChar span').textContent = item.romaji;
  $('#mnemonicText').innerHTML = mnemonics[item.romaji] || `Hãy liên tưởng hình dáng chữ <b>${item.char}</b> với âm <b>${item.romaji}</b>.`;
  const example = examples[item.romaji] || [item.char, item.romaji, 'âm kana'];
  $('#exampleWord').textContent = state.script === 'katakana' && example[0].length > 1 ? item.char : example[0];
  $('#exampleRomaji').textContent = example[1];
  $('#exampleMeaning').textContent = example[2];
  $('#favoriteButton').setAttribute('aria-pressed', state.learning.has(item.char));
  const activeGroup = getNextLesson();
  const canPractice = state.lessonMode || activeGroup.characters.some(character => character.char === item.char);
  $('#practiceCurrentChar').disabled = !canPractice;
  $('#practiceCurrentChar').dataset.route = 'pronounce';
  $('#practiceCurrentChar').innerHTML = canPractice ? `Bắt đầu 5 bước với ${item.char} <span>→</span>` : `Chưa mở trong lộ trình`;
}

function speak(text) {
  if (!state.sound) return showToast('Âm thanh đang tắt');
  if (!('speechSynthesis' in window)) return showToast('Trình duyệt này chưa hỗ trợ phát âm');
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP'; utterance.rate = .72;
  window.speechSynthesis.speak(utterance);
}

// Pronunciation practice (Web Speech API)
let activeRecognition = null;
let recognitionHasResult = false;

function isPronounceable(item) {
  return item && !/nhỏ|âm dài/i.test(item.romaji);
}

function normalizeSpeechText(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s。、，,.!?！？'"「」『』・ー-]/g, '')
    .replace(/[ァ-ヶ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

function pronunciationMatches(transcript, item = state.current) {
  const heard = normalizeSpeechText(transcript);
  const kanaReading = normalizeSpeechText(item.char);
  const latinReading = normalizeSpeechText(item.romaji);
  const commonAliases = {
    'を': ['お', 'o'],
    'ぢ': ['じ'],
    'づ': ['ず'],
    'ぢゃ': ['じゃ'],
    'ぢゅ': ['じゅ'],
    'ぢょ': ['じょ'],
    'ふ': ['hu']
  };
  const accepted = new Set([kanaReading, latinReading, ...(commonAliases[kanaReading] || [])].map(normalizeSpeechText));
  return accepted.has(heard);
}

function setPronunciationFeedback(kind, title, message, transcript = '') {
  const card = $('#pronunciationCard');
  const feedback = $('#pronunciationFeedback');
  card.classList.remove('listening', 'correct', 'wrong', 'error');
  feedback.classList.remove('listening', 'correct', 'wrong', 'error');
  if (kind) { card.classList.add(kind); feedback.classList.add(kind); }
  $('#pronunciationStatus').textContent = title;
  $('#pronunciationMessage').textContent = message;
  $('#heardResult').hidden = !transcript;
  $('#heardTranscript').textContent = transcript || '—';
}

function setupPronunciation() {
  activeRecognition?.abort?.();
  activeRecognition = null;
  recognitionHasResult = false;
  const lesson = getLesson();
  $('#pronunciationGlyph').textContent = state.current.char;
  $('#pronounceProgress').style.width = state.lessonMode ? `${((state.lessonCharIndex + .35) / lesson.characters.length) * 100}%` : '25%';
  $('#pronunciationContinue').disabled = true;
  $('#skipPronunciation').hidden = false;
  $('#startPronunciation').disabled = false;
  $('#startPronunciation span').textContent = 'Chạm để nói';
  setPronunciationFeedback('', 'Sẵn sàng nghe', 'Trình duyệt sẽ xin quyền dùng microphone ở lần đầu.');

  if (!isPronounceable(state.current)) {
    setPronunciationFeedback('error', 'Chữ này không có âm độc lập', 'Kana nhỏ và ký hiệu sẽ chuyển thẳng sang phần luyện viết.');
    $('#startPronunciation').hidden = true;
    $('#skipPronunciation').hidden = true;
    $('#pronunciationContinue').disabled = false;
    return;
  }

  $('#startPronunciation').hidden = false;
  if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
    setPronunciationFeedback('error', 'Trình duyệt chưa hỗ trợ', 'Hãy dùng Chrome hoặc Edge mới, hoặc bỏ qua bước này để tiếp tục.');
    $('#startPronunciation').disabled = true;
    $('#skipPronunciation').hidden = false;
  }
}

function showPronunciationSuccess(transcript, confidence = 0) {
  resetPracticeFailures();
  const confidenceText = confidence > 0 ? ` · độ tin cậy ${Math.round(confidence * 100)}%` : '';
  setPronunciationFeedback('correct', 'Phát âm đúng!', `Âm khớp với “${state.current.romaji}”${confidenceText}.`, transcript);
  $('#pronunciationContinue').disabled = false;
  $('#startPronunciation').disabled = false;
  $('#startPronunciation span').textContent = 'Nói lại';
  speak(state.current.char);
}

function processRecognitionAlternatives(alternatives) {
  const normalized = alternatives.map(item => typeof item === 'string' ? { transcript: item, confidence: 0 } : item);
  const matched = normalized.find(item => pronunciationMatches(item.transcript));
  const best = matched || normalized[0] || { transcript: '', confidence: 0 };
  if (matched) {
    showPronunciationSuccess(best.transcript, best.confidence || 0);
    return true;
  }
  setPronunciationFeedback('wrong', 'Chưa khớp, thử lại nhé', `Ứng dụng đang chờ âm “${state.current.romaji}”. Hãy nói chậm và rõ hơn.`, best.transcript);
  $('#startPronunciation').disabled = false;
  $('#startPronunciation span').textContent = 'Thử lại';
  showPracticeFailure('pronunciation', `Ứng dụng đang chờ âm “${state.current.romaji}”.`, { onRetry: () => $('#startPronunciation').focus() });
  return false;
}

function startPronunciationRecognition() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return setupPronunciation();
  activeRecognition?.abort?.();
  const recognition = new Recognition();
  activeRecognition = recognition;
  recognitionHasResult = false;
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;

  try {
    if ('SpeechRecognitionPhrase' in window && 'phrases' in recognition) {
      recognition.phrases = [new window.SpeechRecognitionPhrase(state.current.char, 10)];
    }
  } catch (_) { /* Phrase bias is optional and browser-dependent. */ }

  recognition.onstart = () => {
    $('#startPronunciation').disabled = true;
    $('#startPronunciation span').textContent = 'Đang nghe…';
    setPronunciationFeedback('listening', 'Đang lắng nghe', `Hãy đọc chữ ${state.current.char} ngay bây giờ.`);
  };
  recognition.onresult = event => {
    recognitionHasResult = true;
    const alternatives = [];
    for (let resultIndex = event.resultIndex; resultIndex < event.results.length; resultIndex += 1) {
      for (let alternativeIndex = 0; alternativeIndex < event.results[resultIndex].length; alternativeIndex += 1) {
        const alternative = event.results[resultIndex][alternativeIndex];
        alternatives.push({ transcript: alternative.transcript.trim(), confidence: alternative.confidence });
      }
    }
    processRecognitionAlternatives(alternatives);
  };
  recognition.onerror = event => {
    recognitionHasResult = true;
    const messages = {
      'not-allowed': ['Chưa có quyền microphone', 'Cho phép microphone trong cài đặt trang rồi thử lại.'],
      'service-not-allowed': ['Dịch vụ nhận dạng bị chặn', 'Trình duyệt hoặc hệ thống đang chặn dịch vụ nhận dạng giọng nói.'],
      'audio-capture': ['Không tìm thấy microphone', 'Kiểm tra microphone của thiết bị rồi thử lại.'],
      'no-speech': ['Chưa nghe thấy giọng nói', 'Đưa thiết bị gần hơn và nói lại một lần.'],
      'network': ['Không thể kết nối nhận dạng', 'Một số trình duyệt cần Internet cho nhận dạng giọng nói.']
    };
    const [title, message] = messages[event.error] || ['Không thể nhận dạng', 'Hãy thử lại hoặc bỏ qua bước phát âm.'];
    setPronunciationFeedback('error', title, message);
    $('#startPronunciation').disabled = false;
    $('#startPronunciation span').textContent = 'Thử lại';
    $('#skipPronunciation').hidden = false;
  };
  recognition.onend = () => {
    activeRecognition = null;
    if (!recognitionHasResult) {
      setPronunciationFeedback('error', 'Không nhận được kết quả', 'Hãy thử nói lại một lần nữa.');
      $('#startPronunciation').disabled = false;
      $('#startPronunciation span').textContent = 'Thử lại';
    }
  };

  try { recognition.start(); }
  catch (_) {
    setPronunciationFeedback('error', 'Microphone đang bận', 'Đợi một chút rồi chạm “Thử lại”.');
    $('#startPronunciation').disabled = false;
  }
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

let modalAction = null, modalRequired = false;
function showModal(title, text, options = {}) {
  $('#modalTitle').textContent = title;
  $('#modalText').textContent = text;
  $('#modalOkay').textContent = options.actionLabel || 'Đã hiểu';
  modalAction = options.onAction || null;
  modalRequired = Boolean(options.required);
  $('#modalClose').hidden = modalRequired;
  $('#modalBackdrop').hidden = false;
  $('#modalOkay').focus();
}
function closeModal(runAction = false) {
  if (modalRequired && !runAction) return;
  $('#modalBackdrop').hidden = true;
  const action = modalAction;
  modalAction = null;
  modalRequired = false;
  $('#modalClose').hidden = false;
  if (runAction && action) action();
}

function resetPracticeFailures() { state.practiceFailures = 0; state.practiceFailureKey = null; }

function findKanaItem(char) {
  return Object.values(kana).flatMap(script => Object.values(script).flat()).find(item => item.char === char) || state.current;
}

function showPracticeFailure(kind, detail, options = {}) {
  const item = options.item || state.current;
  const failureKey = options.failureKey || `${item.char}:${options.stage || state.route}:${state.quizMode}`;
  if (state.practiceFailureKey !== failureKey) {
    state.practiceFailures = 0;
    state.practiceFailureKey = failureKey;
  }
  state.practiceFailures += 1;
  const mustReview = state.practiceFailures >= 3;
  const titles = {
    'glyph-shape': 'Chưa đúng mặt chữ',
    'stroke-count': 'Sai số lượng nét',
    'stroke-order': 'Sai thứ tự nét',
    'stroke-direction': 'Sai hướng đi của nét',
    pronunciation: 'Phát âm chưa đúng'
  };
  showModal(
    titles[kind] || 'Hãy thử lại',
    mustReview ? `${detail} Bạn đã sai 3 lần liên tiếp, hãy xem lại thứ tự nét của ${item.char}.` : `${detail} Lần sai ${state.practiceFailures}/3.`,
    {
      actionLabel: mustReview ? 'Xem lại thứ tự nét' : 'Thử lại',
      required: mustReview,
      onAction: () => {
        if (!mustReview) return options.onRetry?.();
        state.current = item;
        state.strokeDemoResumeRoute = options.resumeRoute || 'character-recognition';
        resetPracticeFailures();
        navigate('stroke-demo');
      }
    }
  );
}

// Drawing canvas
const MAX_CAPTURED_STROKES = 24;
const MAX_POINTS_PER_STROKE = 512;
const MIN_CAPTURE_POINT_DISTANCE = 1.5;
let canvas, ctx, isDrawing = false, strokes = [], currentStroke = [], guideVisible = true;
function setupCanvas() {
  canvas = $('#traceCanvas'); ctx = canvas.getContext('2d');
  $('#writeRomaji').textContent = state.current.romaji;
  const lesson = getLesson();
  $('#writeProgress').style.width = state.lessonMode ? `${((state.lessonCharIndex + .8) / lesson.characters.length) * 100}%` : '80%';
  strokes = []; currentStroke = []; $('#strokeCount').textContent = '0'; guideVisible = true; $('#showGuide').innerHTML = '<span aria-hidden="true">目</span> Ẩn mẫu';
  drawCanvas();
}

function clearGuidedWriting() {
  strokes = [];
  currentStroke = [];
  $('#strokeCount').textContent = '0';
  drawCanvas();
}

function submitGuidedWriting() {
  if (!strokes.length) return showToast('Hãy viết ít nhất một nét trước nhé');
  const candidates = getLesson().characters.map(item => item.char);
  const result = recognizeKanaWriting(strokes, state.current.char, candidates);
  if (!result.correct) {
    const kind = result.reason === 'glyph-shape' ? 'glyph-shape' : result.reason;
    showPracticeFailure(kind, writingFailureDetail(result, state.current.char), { onRetry: clearGuidedWriting });
    return;
  }
  resetPracticeFailures();
  if (!state.lessonMode) return showModal('Nét viết chính xác!', `Bạn đã viết đúng mặt chữ, số nét, thứ tự và hướng nét của ${state.current.char}.`);
  state.drawMode = 'character';
  navigate('draw-test');
}
function drawCanvas() {
  if (!ctx) return;
  const size = canvas.width;
  ctx.clearRect(0,0,size,size); ctx.fillStyle = '#fffdf8'; ctx.fillRect(0,0,size,size);
  ctx.strokeStyle = '#ded8ca'; ctx.lineWidth = 2; ctx.setLineDash([10,10]);
  ctx.beginPath(); ctx.moveTo(size/2,35); ctx.lineTo(size/2,size-35); ctx.moveTo(35,size/2); ctx.lineTo(size-35,size/2); ctx.stroke(); ctx.setLineDash([]);
  if (guideVisible) {
    ctx.globalAlpha = .11; ctx.fillStyle = '#20231f'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `500 ${state.current.char.length > 1 ? 300 : 440}px "Noto Serif JP", serif`; ctx.fillText(state.current.char, size/2, size/2 + 14); ctx.globalAlpha = 1;
  }
  ctx.strokeStyle = '#bc3c32'; ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  [...strokes, currentStroke].forEach(points => {
    if (points.length < 2) return; ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y); points.slice(1).forEach(p => ctx.lineTo(p.x,p.y)); ctx.stroke();
  });
}
function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect(); const touch = event.touches?.[0] || event;
  return { x: (touch.clientX - rect.left) * canvas.width / rect.width, y: (touch.clientY - rect.top) * canvas.height / rect.height };
}
function appendCapturedPoint(target, point) {
  if (target.length >= MAX_POINTS_PER_STROKE) return;
  const previous = target[target.length - 1];
  if (!previous || Math.hypot(point.x - previous.x, point.y - previous.y) >= MIN_CAPTURE_POINT_DISTANCE) target.push(point);
}
function startDraw(event) { if (strokes.length >= MAX_CAPTURED_STROKES) return showToast('Đã đạt giới hạn nét, hãy hoàn tác hoặc viết lại'); event.preventDefault(); isDrawing = true; currentStroke = [canvasPoint(event)]; drawCanvas(); }
function moveDraw(event) { if (!isDrawing) return; event.preventDefault(); appendCapturedPoint(currentStroke, canvasPoint(event)); drawCanvas(); }
function endDraw() { if (!isDrawing) return; isDrawing = false; if (currentStroke.length > 2) strokes.push(currentStroke); currentStroke = []; $('#strokeCount').textContent = strokes.length; drawCanvas(); }

// Quiz
const freeQuizPool = [
  { char:'し', answer:'shi', choices:['shi','tsu','so','n'] },
  { char:'ぬ', answer:'nu', choices:['me','ne','nu','no'] },
  { char:'カ', answer:'ka', choices:['ki','ka','ke','ko'] },
  { char:'そ', answer:'so', choices:['so','n','ri','ro'] },
  { char:'ツ', answer:'tsu', choices:['shi','su','tsu','chi'] }
];

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function buildChoiceQuestion(item, lesson, index) {
  const candidates = shuffled([...new Set(lesson.characters.map(char => char.romaji))].filter(value => value !== item.romaji));
  const choices = shuffled([item.romaji, ...candidates.slice(0, 3)]);
  return { type: 'choice', round: index + 1, char: item.char, answer: item.romaji, choices, item };
}

function buildCharacterRecognitionQuestion(item = state.current, lesson = getLesson()) {
  const choices = [...new Set(lesson.characters.map(character => character.romaji))];
  return { type: 'choice', round: 1, char: item.char, answer: item.romaji, choices: shuffled(choices), item };
}

function startCharacterRecognition() {
  state.quizMode = 'character-recognition';
  state.quizQuestions = [buildCharacterRecognitionQuestion()];
  state.quizIndex = 0;
  state.selectedAnswer = null;
  navigate('quiz');
}

function buildNonRepeatingOrder(items, count) {
  const result = [];
  let bag = [];
  while (result.length < count) {
    if (!bag.length) bag = shuffled(items);
    let index = bag.findIndex(item => !result.length || item.char !== result[result.length - 1].char);
    if (index < 0) index = 0;
    result.push(bag.splice(index, 1)[0]);
  }
  return result;
}

function buildLessonAssessment(lesson) {
  const roundCount = 4;
  const choiceOrder = buildNonRepeatingOrder(lesson.characters, roundCount);
  const drawOrder = [];
  const drawUsage = new Map(lesson.characters.map(item => [item.char, 0]));
  for (let round = 0; round < roundCount; round += 1) {
    let candidates = shuffled(lesson.characters).filter(item => item.char !== choiceOrder[round].char && (!drawOrder.length || item.char !== drawOrder[drawOrder.length - 1].char));
    if (!candidates.length) candidates = shuffled(lesson.characters).filter(item => item.char !== choiceOrder[round].char);
    if (!candidates.length) candidates = shuffled(lesson.characters);
    candidates.sort((a, b) => drawUsage.get(a.char) - drawUsage.get(b.char));
    const selected = candidates[0];
    drawOrder.push(selected);
    drawUsage.set(selected.char, drawUsage.get(selected.char) + 1);
  }
  const steps = [];
  for (let round = 0; round < roundCount; round += 1) {
    const choiceItem = choiceOrder[round];
    const drawItem = drawOrder[round];
    steps.push(buildChoiceQuestion(choiceItem, lesson, round));
    steps.push({ type: 'draw', round: round + 1, char: drawItem.char, answer: drawItem.romaji, item: drawItem });
  }
  return steps;
}

function startLessonQuiz() {
  state.quizMode = 'lesson';
  state.drawMode = 'assessment';
  state.quizQuestions = buildLessonAssessment(getLesson());
  state.quizIndex = 0;
  state.quizCorrect = 0;
  navigate('quiz');
}

function buildReviewQuestions() {
  const knownItems = shuffled(getKnownItems()).slice(0, 8);
  const allRomaji = [...new Set(Object.values(kana).flatMap(script => Object.values(script).flat().map(item => item.romaji)))];
  return knownItems.map((item, index) => {
    const distractors = shuffled(allRomaji.filter(value => value !== item.romaji)).slice(0, 3);
    return { type: 'choice', round: index + 1, char: item.char, answer: item.romaji, choices: shuffled([item.romaji, ...distractors]) };
  });
}

function startSmartReview() {
  if (getKnownItems().length === 0) return navigate('home');
  state.quizMode = 'review';
  state.quizQuestions = buildReviewQuestions();
  state.quizIndex = 0;
  state.quizCorrect = 0;
  navigate('quiz');
}

function activeQuizPool() { return ['lesson', 'review', 'character-recognition'].includes(state.quizMode) ? state.quizQuestions : freeQuizPool; }

function advanceAssessment() {
  state.quizIndex += 1;
  if (state.quizIndex >= state.quizQuestions.length) return completeLesson();
  const nextStep = state.quizQuestions[state.quizIndex];
  if (nextStep.type === 'draw') state.drawMode = 'assessment';
  navigate(nextStep.type === 'draw' ? 'draw-test' : 'quiz');
}

function renderQuiz() {
  if (quizAdvanceTimer) { clearTimeout(quizAdvanceTimer); quizAdvanceTimer = 0; }
  const pool = activeQuizPool();
  const question = pool[state.quizIndex % pool.length]; state.selectedAnswer = null; state.quizLocked = false;
  const isCharacterRecognition = state.quizMode === 'character-recognition';
  $('#quizGlyph').textContent = question.char;
  $('#quizProgress').style.width = isCharacterRecognition ? '60%' : `${((state.quizIndex % pool.length)+1)/pool.length*100}%`;
  $('.quiz-prompt .eyebrow').textContent = isCharacterRecognition ? 'Bước 3/5 · Trắc nghiệm mặt chữ' : 'Nhận mặt chữ';
  $('#quizTitle').textContent = isCharacterRecognition ? `Âm nào khớp với ${question.char}?` : 'Âm nào khớp với chữ này?';
  $('.heart-count').hidden = isCharacterRecognition;
  $('#answerGrid').innerHTML = question.choices.map(choice => `<button class="answer-button" data-answer="${choice}">${choice}</button>`).join('');
  $('#quizHint').textContent = state.quizMode === 'lesson' ? `Vòng ${question.round}/4 · Bước ${state.quizIndex + 1}/${pool.length}` : state.quizMode === 'review' ? `Ôn tập thông minh · ${state.quizIndex + 1}/${pool.length}` : isCharacterRecognition ? `Chỉ dùng ${getLesson().title}` : `Luyện tập · Câu ${(state.quizIndex % pool.length)+1}/${pool.length}`; $('#checkAnswer').textContent = 'Kiểm tra'; $('#checkAnswer').disabled = true;
  $$('.answer-button').forEach(button => button.addEventListener('click', () => {
    if (state.quizLocked) return; state.selectedAnswer = button.dataset.answer; $$('.answer-button').forEach(b => b.classList.toggle('selected', b === button)); $('#checkAnswer').disabled = false;
  }));
}

function advanceQuizWithoutConfirmation() {
  const pool = activeQuizPool();
  if (state.quizMode === 'lesson') return advanceAssessment();
  if (state.quizMode === 'review') {
    if (state.quizIndex + 1 < pool.length) { state.quizIndex += 1; return renderQuiz(); }
    showToast(`Đã ôn xong ${pool.length} chữ đã học`);
    return navigate('review');
  }
  if (state.quizIndex + 1 < pool.length) { state.quizIndex += 1; return renderQuiz(); }
  state.quizIndex = 0;
  return renderQuiz();
}

function checkQuiz() {
  if (!state.selectedAnswer) return;
  const pool = activeQuizPool();
  const question = pool[state.quizIndex % pool.length];
  if (state.quizLocked) return;
  state.quizLocked = true; const correct = state.selectedAnswer === question.answer;
  $$('.answer-button').forEach(button => {
    button.classList.remove('selected');
    if (button.dataset.answer === question.answer) button.classList.add('correct');
    else if (button.dataset.answer === state.selectedAnswer) button.classList.add('wrong');
  });
  $('#quizHint').textContent = correct ? 'Chính xác! よくできました' : 'Chưa đúng — hãy thử lại';
  $('#checkAnswer').textContent = 'Tự chuyển…';
  $('#checkAnswer').disabled = true;
  if (!correct) {
    state.quizLocked = false;
    $('#checkAnswer').textContent = 'Kiểm tra lại';
    const item = question.item || findKanaItem(question.char);
    const resumeRoute = state.quizMode === 'character-recognition' ? 'character-recognition' : 'quiz';
    showPracticeFailure('glyph-shape', `Đáp án vừa chọn chưa khớp với ${question.char}.`, { item, resumeRoute, onRetry: renderQuiz });
    return;
  }
  resetPracticeFailures();
  state.quizCorrect += 1;
  speak(question.char);
  if (state.quizMode === 'character-recognition') {
    quizAdvanceTimer = setTimeout(() => {
      quizAdvanceTimer = 0;
      if (state.route === 'quiz') navigate('write');
    }, window.KANA_QUIZ_FEEDBACK_MS ?? 900);
    return;
  }
  quizAdvanceTimer = setTimeout(() => {
    quizAdvanceTimer = 0;
    if (state.route === 'quiz' && state.quizLocked) advanceQuizWithoutConfirmation();
  }, window.KANA_QUIZ_FEEDBACK_MS ?? 900);
}

// Automatic stroke-order demonstration shown immediately before every draw test.
let strokeDemoFrameId = 0, strokeDemoTimerId = 0, strokeDemoGeneration = 0;

function cancelStrokeDemo() {
  strokeDemoGeneration += 1;
  if (strokeDemoFrameId) cancelAnimationFrame(strokeDemoFrameId);
  if (strokeDemoTimerId) clearTimeout(strokeDemoTimerId);
  strokeDemoFrameId = 0;
  strokeDemoTimerId = 0;
}

function strokeLength(points) {
  let length = 0;
  for (let index = 1; index < points.length; index += 1) {
    length += Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y);
  }
  return length;
}

function buildStrokeDemoSequence(char, canvasSize = 640) {
  const units = Array.from(char);
  const records = window.KANA_STROKES?.characters || {};
  const placements = units.length === 1
    ? [{ x: .08, y: .08, width: .84, height: .84, lineWidth: 23 }]
    : units.map((_, index) => index === 0
      ? { x: .035, y: .10, width: .66, height: .78, lineWidth: 21 }
      : { x: .68, y: .38, width: .28, height: .38, lineWidth: 15 });
  const strokes = [];
  units.forEach((unit, unitIndex) => {
    const record = records[unit] || (unit === 'ー' ? { strokes: [{ points: [[.18, .5], [.5, .5], [.82, .5]] }] } : null);
    if (!record) return;
    const placement = placements[Math.min(unitIndex, placements.length - 1)];
    record.strokes.forEach((stroke, strokeIndex) => {
      const points = stroke.points.map(([x, y]) => ({
        x: (placement.x + x * placement.width) * canvasSize,
        y: (placement.y + y * placement.height) * canvasSize
      }));
      strokes.push({ unit, unitIndex, strokeIndex, points, lineWidth: placement.lineWidth, length: strokeLength(points) });
    });
  });
  return strokes;
}

function normalizeStrokeGeometry(strokeSet) {
  const usable = strokeSet.slice(0, MAX_CAPTURED_STROKES).filter(stroke => stroke?.length >= 2).map(stroke => stroke.slice(0, MAX_POINTS_PER_STROKE));
  const points = usable.flat();
  if (!points.length) return [];
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  points.forEach(point => { minX = Math.min(minX, point.x); maxX = Math.max(maxX, point.x); minY = Math.min(minY, point.y); maxY = Math.max(maxY, point.y); });
  const scale = Math.max(1, maxX - minX, maxY - minY);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  return usable.map(stroke => stroke.map(point => ({ x: (point.x - centerX) / scale, y: (point.y - centerY) / scale })));
}

function resampleStroke(points, count = 24) {
  if (!points.length) return [];
  const lengths = [0];
  for (let index = 1; index < points.length; index += 1) lengths.push(lengths[index - 1] + Math.hypot(points[index].x - points[index - 1].x, points[index].y - points[index - 1].y));
  const total = lengths[lengths.length - 1];
  if (!total) return Array.from({ length: count }, () => ({ ...points[0] }));
  return Array.from({ length: count }, (_, sampleIndex) => {
    const target = total * sampleIndex / (count - 1);
    let pointIndex = 1;
    while (pointIndex < lengths.length - 1 && lengths[pointIndex] < target) pointIndex += 1;
    const startLength = lengths[pointIndex - 1];
    const segmentLength = Math.max(.000001, lengths[pointIndex] - startLength);
    const ratio = (target - startLength) / segmentLength;
    const start = points[pointIndex - 1], end = points[pointIndex];
    return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
  });
}

function strokePathDistance(a, b) {
  const first = resampleStroke(a), second = resampleStroke(b);
  if (!first.length || !second.length) return 1;
  return first.reduce((sum, point, index) => sum + Math.hypot(point.x - second[index].x, point.y - second[index].y), 0) / first.length;
}

function minimumStrokeAssignment(matrix) {
  const count = matrix.length;
  const memo = new Map();
  const visit = (row, used) => {
    if (row === count) return { cost: 0, mapping: [] };
    const key = `${row}:${used}`;
    if (memo.has(key)) return memo.get(key);
    let best = { cost: Infinity, mapping: [] };
    for (let column = 0; column < count; column += 1) {
      if (used & (1 << column)) continue;
      const tail = visit(row + 1, used | (1 << column));
      const cost = matrix[row][column].best + tail.cost;
      if (cost < best.cost) best = { cost, mapping: [column, ...tail.mapping] };
    }
    memo.set(key, best);
    return best;
  };
  return visit(0, 0);
}

function assessStrokeOrder(userStrokes, expectedChar) {
  const expectedStrokes = buildStrokeDemoSequence(expectedChar).map(stroke => stroke.points);
  const user = normalizeStrokeGeometry(userStrokes);
  const expected = normalizeStrokeGeometry(expectedStrokes);
  if (!expected.length) return { correct: true, reason: null, expectedCount: 0, actualCount: user.length, score: 0 };
  if (user.length !== expected.length) return { correct: false, reason: 'stroke-count', expectedCount: expected.length, actualCount: user.length, score: 1 };
  const matrix = user.map(userStroke => expected.map(expectedStroke => {
    const forward = strokePathDistance(userStroke, expectedStroke);
    const reverse = strokePathDistance([...userStroke].reverse(), expectedStroke);
    return { forward, reverse, best: Math.min(forward, reverse) };
  }));
  const assignment = minimumStrokeAssignment(matrix);
  const assigned = assignment.mapping.map((expectedIndex, userIndex) => matrix[userIndex][expectedIndex]);
  const assignmentMean = assignment.cost / Math.max(1, user.length);
  const assignmentMax = Math.max(...assigned.map(pair => pair.best));
  if (assignmentMean > .27 || assignmentMax > .43) return { correct: false, reason: 'stroke-shape', expectedCount: expected.length, actualCount: user.length, score: assignmentMean };
  if (assignment.mapping.some((expectedIndex, userIndex) => expectedIndex !== userIndex)) return { correct: false, reason: 'stroke-order', expectedCount: expected.length, actualCount: user.length, score: assignmentMean, mapping: assignment.mapping };
  const reversedIndex = assigned.findIndex(pair => pair.reverse + .04 < pair.forward && pair.reverse < .25);
  if (reversedIndex >= 0) return { correct: false, reason: 'stroke-direction', strokeIndex: reversedIndex, expectedCount: expected.length, actualCount: user.length, score: assigned[reversedIndex].reverse };
  const forwardMean = assigned.reduce((sum, pair) => sum + pair.forward, 0) / assigned.length;
  if (forwardMean > .29 || Math.max(...assigned.map(pair => pair.forward)) > .45) return { correct: false, reason: 'stroke-shape', expectedCount: expected.length, actualCount: user.length, score: forwardMean };
  return { correct: true, reason: null, expectedCount: expected.length, actualCount: user.length, score: forwardMean };
}

function drawPartialStroke(context, stroke, fraction) {
  const targetLength = stroke.length * Math.max(0, Math.min(1, fraction));
  let travelled = 0;
  let pen = stroke.points[0];
  context.beginPath();
  context.moveTo(pen.x, pen.y);
  for (let index = 1; index < stroke.points.length; index += 1) {
    const start = stroke.points[index - 1];
    const end = stroke.points[index];
    const segmentLength = Math.hypot(end.x - start.x, end.y - start.y);
    if (travelled + segmentLength <= targetLength) {
      context.lineTo(end.x, end.y);
      pen = end;
      travelled += segmentLength;
      continue;
    }
    const remaining = Math.max(0, targetLength - travelled);
    const ratio = segmentLength ? remaining / segmentLength : 0;
    pen = { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
    context.lineTo(pen.x, pen.y);
    break;
  }
  context.stroke();
  return pen;
}

function drawStrokeDemoFrame(strokes, progress, fallbackChar) {
  const canvas = $('#strokeDemoCanvas');
  const context = canvas.getContext('2d');
  const size = canvas.width;
  context.clearRect(0, 0, size, size);
  context.fillStyle = '#fffdf8';
  context.fillRect(0, 0, size, size);
  context.strokeStyle = '#ded8ca';
  context.lineWidth = 2;
  context.setLineDash([12, 12]);
  context.beginPath();
  context.moveTo(size / 2, 34); context.lineTo(size / 2, size - 34);
  context.moveTo(34, size / 2); context.lineTo(size - 34, size / 2);
  context.stroke();
  context.setLineDash([]);

  if (!strokes.length) {
    context.save();
    context.globalAlpha = .12 + progress * .88;
    context.fillStyle = '#bc3c32';
    context.font = '460px "Noto Serif JP", sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(fallbackChar, size / 2, size / 2 + 20);
    context.restore();
    $('#strokeDemoStroke').textContent = '1';
    return;
  }

  context.lineCap = 'round';
  context.lineJoin = 'round';
  strokes.forEach(stroke => {
    context.strokeStyle = 'rgba(188,60,50,.105)';
    context.lineWidth = stroke.lineWidth + 5;
    drawPartialStroke(context, stroke, 1);
  });

  const gapWeight = 72;
  const totalWeight = strokes.reduce((sum, stroke) => sum + stroke.length, 0) + gapWeight * Math.max(0, strokes.length - 1);
  let budget = Math.max(0, Math.min(1, progress)) * totalWeight;
  let pen = null;
  let activeStroke = 0;
  strokes.forEach((stroke, index) => {
    if (budget <= 0) return;
    const fraction = Math.min(1, budget / stroke.length);
    activeStroke = index;
    context.strokeStyle = fraction < 1 ? '#bc3c32' : '#20231f';
    context.lineWidth = stroke.lineWidth;
    pen = drawPartialStroke(context, stroke, fraction);
    if (fraction === 1) budget -= stroke.length + gapWeight;
    else budget = 0;
  });
  const shownStroke = Math.min(strokes.length, activeStroke + 1);
  $('#strokeDemoStroke').textContent = shownStroke;

  if (pen && progress < .995) {
    context.save();
    context.shadowColor = 'rgba(145,48,39,.28)';
    context.shadowBlur = 16;
    context.fillStyle = '#fffdf8';
    context.strokeStyle = '#bc3c32';
    context.lineWidth = 8;
    context.beginPath();
    context.arc(pen.x, pen.y, 15, 0, Math.PI * 2);
    context.fill(); context.stroke();
    context.restore();
  }
}

async function setupStrokeDemo() {
  cancelStrokeDemo();
  const generation = strokeDemoGeneration;
  const item = state.current;
  const lesson = getLesson();
  if (!item?.char) return navigate('character');
  $('#strokeDemoGlyph').textContent = item.char;
  $('#strokeDemoCounter').textContent = `${state.lessonCharIndex + 1}/${lesson.characters.length}`;
  $('#strokeDemoProgress').style.width = '0%';
  $('#strokeDemoStatus b').textContent = 'Đang phát mẫu tự động';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.fonts?.ready) await document.fonts.ready;
  if (generation !== strokeDemoGeneration || state.route !== 'stroke-demo') return;
  const strokes = buildStrokeDemoSequence(item.char);
  $('#strokeDemoTotal').textContent = Math.max(1, strokes.length);
  $('#strokeDemoStroke').textContent = '1';
  const configuredDuration = Number(window.KANA_DEMO_DURATION_MS);
  const normalDuration = Math.max(2200, Math.min(3600, 1750 + strokes.length * 250));
  const duration = reduceMotion ? 0 : Number.isFinite(configuredDuration) && configuredDuration > 0 ? configuredDuration : normalDuration;
  const holdDuration = reduceMotion ? 650 : configuredDuration ? Math.max(40, Math.min(350, configuredDuration * .25)) : 420;
  const startedAt = performance.now();

  const finish = () => {
    if (generation !== strokeDemoGeneration || state.route !== 'stroke-demo') return;
    drawStrokeDemoFrame(strokes, 1, item.char);
    $('#strokeDemoProgress').style.width = '100%';
    $('#strokeDemoSeconds').textContent = '0';
    $('#strokeDemoStatus b').textContent = 'Mẫu đã hoàn tất';
    strokeDemoTimerId = setTimeout(() => {
      if (generation !== strokeDemoGeneration || state.route !== 'stroke-demo' || state.current.char !== item.char) return;
      const resumeRoute = state.strokeDemoResumeRoute;
      state.strokeDemoResumeRoute = null;
      if (resumeRoute && resumeRoute !== 'character-recognition') navigate(resumeRoute);
      else startCharacterRecognition();
    }, holdDuration);
  };

  if (!duration) return finish();
  const animate = now => {
    if (generation !== strokeDemoGeneration || state.route !== 'stroke-demo') return;
    const elapsed = now - startedAt;
    const progress = Math.min(1, elapsed / duration);
    const eased = 1 - Math.pow(1 - progress, 2);
    drawStrokeDemoFrame(strokes, eased, item.char);
    $('#strokeDemoProgress').style.width = `${progress * 100}%`;
    $('#strokeDemoSeconds').textContent = Math.max(1, Math.ceil((duration + holdDuration - elapsed) / 1000));
    if (progress >= 1) return finish();
    strokeDemoFrameId = requestAnimationFrame(animate);
  };
  strokeDemoFrameId = requestAnimationFrame(animate);
}

// Assessment drawing: blank canvas plus local glyph-shape recognition.
const RECOGNITION_SIZE = 64;
const glyphMaskCache = new Map();
let testCanvas, testCtx, testDrawing = false, testStrokes = [], testCurrentStroke = [], testSubmitted = false, recognitionBusy = false, lastRecognitionResult = null;

function readBinaryMask(canvas, threshold = 28) {
  const { width, height } = canvas;
  const pixels = canvas.getContext('2d').getImageData(0, 0, width, height).data;
  const mask = new Uint8Array(width * height);
  for (let index = 0; index < mask.length; index += 1) mask[index] = pixels[index * 4 + 3] >= threshold ? 1 : 0;
  return mask;
}

function maskStats(mask, size = RECOGNITION_SIZE) {
  let minX = size, minY = size, maxX = -1, maxY = -1, count = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!mask[y * size + x]) continue;
      count += 1;
      minX = Math.min(minX, x); minY = Math.min(minY, y);
      maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    }
  }
  const width = count ? maxX - minX + 1 : 0;
  const height = count ? maxY - minY + 1 : 0;
  return { count, minX, minY, maxX, maxY, width, height, aspect: height ? width / height : 0, density: width && height ? count / (width * height) : 0 };
}

function normalizeCanvasMask(sourceCanvas, size = RECOGNITION_SIZE) {
  const sourceMask = readBinaryMask(sourceCanvas);
  const sourceStats = maskStats(sourceMask, sourceCanvas.width);
  const target = document.createElement('canvas');
  target.width = size; target.height = size;
  if (!sourceStats.count) return { mask: new Uint8Array(size * size), stats: maskStats(new Uint8Array(size * size), size), size };
  const margin = 6;
  const scale = Math.min((size - margin * 2) / sourceStats.width, (size - margin * 2) / sourceStats.height);
  const width = sourceStats.width * scale;
  const height = sourceStats.height * scale;
  const x = (size - width) / 2;
  const y = (size - height) / 2;
  const context = target.getContext('2d');
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, sourceStats.minX, sourceStats.minY, sourceStats.width, sourceStats.height, x, y, width, height);
  const mask = readBinaryMask(target, 20);
  return { mask, stats: maskStats(mask, size), size };
}

function renderGlyphMask(char, size = RECOGNITION_SIZE, weight = 400) {
  const key = `${char}:${size}:${weight}`;
  if (glyphMaskCache.has(key)) return glyphMaskCache.get(key);
  const source = document.createElement('canvas');
  source.width = 192; source.height = 192;
  const context = source.getContext('2d');
  context.fillStyle = '#000';
  context.font = `${weight} 150px "Noto Serif JP", "Yu Gothic", sans-serif`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(char, 96, 101);
  const result = normalizeCanvasMask(source, size);
  glyphMaskCache.set(key, result);
  return result;
}

function rasterizeStrokeMask(strokes, size = RECOGNITION_SIZE) {
  const points = strokes.flat();
  if (!points.length) return { mask: new Uint8Array(size * size), stats: maskStats(new Uint8Array(size * size), size), size, pathLength: 0 };
  const minX = Math.min(...points.map(point => point.x));
  const maxX = Math.max(...points.map(point => point.x));
  const minY = Math.min(...points.map(point => point.y));
  const maxY = Math.max(...points.map(point => point.y));
  const sourceWidth = Math.max(1, maxX - minX);
  const sourceHeight = Math.max(1, maxY - minY);
  const margin = 6;
  const scale = Math.min((size - margin * 2) / sourceWidth, (size - margin * 2) / sourceHeight);
  const offsetX = (size - sourceWidth * scale) / 2 - minX * scale;
  const offsetY = (size - sourceHeight * scale) / 2 - minY * scale;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const context = canvas.getContext('2d');
  context.strokeStyle = '#000';
  context.lineWidth = Math.max(2.5, Math.min(6, 20 * scale));
  context.lineCap = 'round';
  context.lineJoin = 'round';
  let pathLength = 0;
  strokes.forEach(stroke => {
    if (stroke.length < 2) return;
    context.beginPath();
    context.moveTo(stroke[0].x * scale + offsetX, stroke[0].y * scale + offsetY);
    stroke.slice(1).forEach((point, index) => {
      const previous = stroke[index];
      pathLength += Math.hypot(point.x - previous.x, point.y - previous.y);
      context.lineTo(point.x * scale + offsetX, point.y * scale + offsetY);
    });
    context.stroke();
  });
  const mask = readBinaryMask(canvas, 20);
  return { mask, stats: maskStats(mask, size), size, pathLength };
}

function distanceTransform(mask, size = RECOGNITION_SIZE) {
  const diagonal = 1.4142;
  const distances = new Float32Array(mask.length);
  for (let index = 0; index < mask.length; index += 1) distances[index] = mask[index] ? 0 : 1e4;
  const update = (index, candidate) => { if (candidate < distances[index]) distances[index] = candidate; };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = y * size + x;
      if (x) update(index, distances[index - 1] + 1);
      if (y) update(index, distances[index - size] + 1);
      if (x && y) update(index, distances[index - size - 1] + diagonal);
      if (x < size - 1 && y) update(index, distances[index - size + 1] + diagonal);
    }
  }
  for (let y = size - 1; y >= 0; y -= 1) {
    for (let x = size - 1; x >= 0; x -= 1) {
      const index = y * size + x;
      if (x < size - 1) update(index, distances[index + 1] + 1);
      if (y < size - 1) update(index, distances[index + size] + 1);
      if (x < size - 1 && y < size - 1) update(index, distances[index + size + 1] + diagonal);
      if (x && y < size - 1) update(index, distances[index + size - 1] + diagonal);
    }
  }
  return distances;
}

function meanMaskDistance(sourceMask, targetDistances) {
  let total = 0, count = 0;
  for (let index = 0; index < sourceMask.length; index += 1) {
    if (!sourceMask[index]) continue;
    total += Math.min(16, targetDistances[index]);
    count += 1;
  }
  return count ? total / count : 16;
}

function maskGridDescriptor(mask, size = RECOGNITION_SIZE, cells = 8) {
  const descriptor = new Float32Array(cells * cells);
  let total = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!mask[y * size + x]) continue;
      const cellX = Math.min(cells - 1, Math.floor(x / size * cells));
      const cellY = Math.min(cells - 1, Math.floor(y / size * cells));
      descriptor[cellY * cells + cellX] += 1;
      total += 1;
    }
  }
  if (total) for (let index = 0; index < descriptor.length; index += 1) descriptor[index] /= total;
  return descriptor;
}

function maskProjection(mask, size = RECOGNITION_SIZE, vertical = false) {
  const projection = new Float32Array(size);
  let total = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!mask[y * size + x]) continue;
      projection[vertical ? x : y] += 1;
      total += 1;
    }
  }
  if (total) for (let index = 0; index < size; index += 1) projection[index] /= total;
  return projection;
}

function descriptorDistance(a, b) {
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) difference += Math.abs(a[index] - b[index]);
  return Math.min(1, difference / 2);
}

function compareKanaMasks(user, template) {
  if (!user.stats.count || !template.stats.count) return 1;
  const userToTemplate = meanMaskDistance(user.mask, distanceTransform(template.mask, user.size));
  const templateToUser = meanMaskDistance(template.mask, distanceTransform(user.mask, user.size));
  const shapePenalty = ((userToTemplate + templateToUser) / 2 / user.size) * 2.8;
  const densityPenalty = Math.abs(user.stats.density - template.stats.density) * .4;
  const aspectPenalty = Math.min(1, Math.abs(Math.log(Math.max(.1, user.stats.aspect) / Math.max(.1, template.stats.aspect)))) * .14;
  const gridPenalty = descriptorDistance(maskGridDescriptor(user.mask, user.size), maskGridDescriptor(template.mask, template.size)) * .72;
  const rowPenalty = descriptorDistance(maskProjection(user.mask, user.size), maskProjection(template.mask, template.size)) * .22;
  const columnPenalty = descriptorDistance(maskProjection(user.mask, user.size, true), maskProjection(template.mask, template.size, true)) * .22;
  return Math.min(1, shapePenalty + densityPenalty + aspectPenalty + gridPenalty + rowPenalty + columnPenalty);
}

function recognizeKanaMask(userMask, expectedChar, candidateChars) {
  const chars = [...new Set([expectedChar, ...candidateChars])];
  const ranked = chars.map(char => ({
    char,
    score: Math.min(...[300, 400, 600].map(weight => compareKanaMasks(userMask, renderGlyphMask(char, userMask.size, weight))))
  })).sort((a, b) => a.score - b.score);
  const best = ranked[0];
  const expected = ranked.find(item => item.char === expectedChar);
  const second = ranked[1] || { score: 1 };
  const margin = second.score - best.score;
  const shapeIsClear = expected.score <= .62 && (expected.score <= .24 || margin >= .035);
  const correct = best.char === expectedChar && shapeIsClear;
  const confidence = Math.max(0, Math.min(99, Math.round((1 - expected.score / .62) * 100)));
  return { correct, confidence, bestChar: best.char, score: expected.score, margin, ranked };
}

function recognizeKanaDrawing(strokes, expectedChar, candidateChars) {
  const userMask = rasterizeStrokeMask(strokes);
  if (userMask.pathLength < 55 || userMask.stats.count < 22 || userMask.stats.width < 8 || userMask.stats.height < 8) {
    return { correct: false, confidence: 0, bestChar: null, score: 1, reason: 'too-little-ink', userMask };
  }
  return { ...recognizeKanaMask(userMask, expectedChar, candidateChars), userMask };
}

function recognizeKanaWriting(strokes, expectedChar, candidateChars) {
  const shape = recognizeKanaDrawing(strokes, expectedChar, candidateChars);
  if (!shape.correct) return { ...shape, reason: 'glyph-shape', shapeReason: shape.reason || null };
  const strokeOrder = assessStrokeOrder(strokes, expectedChar);
  if (!strokeOrder.correct) return { ...shape, correct: false, reason: strokeOrder.reason, strokeOrder };
  return { ...shape, correct: true, reason: null, strokeOrder };
}

function writingFailureDetail(result, expectedChar) {
  if (result.reason === 'stroke-count') return `Chữ ${expectedChar} cần ${result.strokeOrder?.expectedCount ?? '?'} nét, nhưng bạn đã vẽ ${result.strokeOrder?.actualCount ?? '?'} nét.`;
  if (result.reason === 'stroke-order') return `Mặt chữ gần đúng nhưng các nét chưa được vẽ theo đúng thứ tự của chữ ${expectedChar}.`;
  if (result.reason === 'stroke-direction') return `Mặt chữ gần đúng nhưng có nét đang được kéo ngược hướng chuẩn của chữ ${expectedChar}.`;
  if (result.shapeReason === 'too-little-ink') return 'Nét vẽ còn quá ít hoặc quá ngắn. Hãy viết đầy đủ mặt chữ.';
  if (result.bestChar && result.bestChar !== expectedChar) return `Nét hiện tại gần giống ${result.bestChar} hơn ${expectedChar}.`;
  return `Hình dáng chưa đủ gần với chữ ${expectedChar}. Hãy quan sát tỷ lệ và viết lại rõ từng nét.`;
}

function setRecognitionStatus(type, title, message) {
  const panel = $('#writingRecognition');
  panel.hidden = false;
  panel.className = `writing-recognition is-${type}`;
  $('#recognitionIcon').textContent = type === 'success' ? '✓' : type === 'error' ? '↺' : '⌁';
  $('#recognitionTitle').textContent = title;
  $('#recognitionMessage').textContent = message;
}

function getActiveDrawItem() {
  if (state.drawMode === 'character') return { ...state.current, type: 'draw', answer: state.current.romaji };
  const step = state.quizQuestions[state.quizIndex];
  return step?.type === 'draw' ? step : null;
}

function setupDrawTest() {
  const step = getActiveDrawItem();
  if (!step) return navigate(state.lessonMode ? 'character' : 'quiz');
  const isCharacterStage = state.drawMode === 'character';
  testCanvas = $('#testDrawCanvas');
  testCtx = testCanvas.getContext('2d');
  testStrokes = [];
  testCurrentStroke = [];
  testSubmitted = false;
  recognitionBusy = false;
  lastRecognitionResult = null;
  $('#drawTestRomaji').textContent = step.answer;
  $('#drawTestEyebrow').textContent = isCharacterStage ? 'Bước 5/5 · Luyện viết không mẫu' : 'Kiểm tra viết · Không có chữ mẫu';
  $('#drawTestTitle').textContent = isCharacterStage ? 'Tự viết chữ từ trí nhớ' : 'Viết Kana cho âm';
  $('#drawTestInstruction').textContent = isCharacterStage
    ? `Không còn chữ mờ. Hãy tự viết chữ cho âm “${step.answer}”; hệ thống sẽ nhận diện hình dáng trước khi hoàn thành chữ này.`
    : 'Viết chữ tương ứng từ trí nhớ. Hệ thống sẽ nhận diện hình dáng trước khi cho bạn tiếp tục.';
  $('#drawTestCounter').textContent = isCharacterStage ? '5/5' : `${state.quizIndex + 1}/${state.quizQuestions.length}`;
  $('#drawTestProgress').style.width = isCharacterStage ? '100%' : `${((state.quizIndex + 1) / state.quizQuestions.length) * 100}%`;
  $('#testStrokeCount').textContent = '0';
  $('#submitDrawTest').disabled = true;
  $('#submitDrawTest').hidden = false;
  $('#submitDrawTest').textContent = 'Kiểm tra chữ viết';
  $('#writingRecognition').hidden = true;
  $('#drawAnswer').hidden = true;
  $('#drawAnswerGlyph').textContent = step.char;
  $('#drawAnswerRomaji').textContent = step.answer;
  $('#drawAnswerMessage').textContent = isCharacterStage
      ? 'Bạn đã viết đúng mặt chữ, thứ tự và hướng nét khi không có mẫu. Xác nhận để hoàn thành đủ 5 bước của chữ này.'
      : 'Mặt chữ, thứ tự và hướng nét đều chính xác. Bạn có thể tiếp tục sang câu kế tiếp.';
  $('#confirmDrawTest').innerHTML = isCharacterStage ? 'Hoàn thành chữ <span>→</span>' : 'Tiếp tục <span>→</span>';
  drawBlankTestCanvas();
}

function drawBlankTestCanvas() {
  if (!testCtx) return;
  const size = testCanvas.width;
  testCtx.clearRect(0, 0, size, size);
  testCtx.fillStyle = '#fffdf8';
  testCtx.fillRect(0, 0, size, size);
  testCtx.strokeStyle = '#ded8ca';
  testCtx.lineWidth = 2;
  testCtx.setLineDash([10, 10]);
  testCtx.beginPath();
  testCtx.moveTo(size / 2, 35); testCtx.lineTo(size / 2, size - 35);
  testCtx.moveTo(35, size / 2); testCtx.lineTo(size - 35, size / 2);
  testCtx.stroke();
  testCtx.setLineDash([]);
  testCtx.strokeStyle = '#20231f';
  testCtx.lineWidth = 20;
  testCtx.lineCap = 'round';
  testCtx.lineJoin = 'round';
  [...testStrokes, testCurrentStroke].forEach(points => {
    if (points.length < 2) return;
    testCtx.beginPath();
    testCtx.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(point => testCtx.lineTo(point.x, point.y));
    testCtx.stroke();
  });
}

function testCanvasPoint(event) {
  const rect = testCanvas.getBoundingClientRect();
  return { x: (event.clientX - rect.left) * testCanvas.width / rect.width, y: (event.clientY - rect.top) * testCanvas.height / rect.height };
}

function startTestDraw(event) {
  if (testSubmitted) return;
  if (testStrokes.length >= MAX_CAPTURED_STROKES) return showToast('Đã đạt giới hạn nét, hãy hoàn tác hoặc viết lại');
  event.preventDefault();
  if ($('#writingRecognition').classList.contains('is-error')) $('#writingRecognition').hidden = true;
  testDrawing = true;
  testCurrentStroke = [testCanvasPoint(event)];
  drawBlankTestCanvas();
}
function moveTestDraw(event) {
  if (!testDrawing || testSubmitted) return;
  event.preventDefault();
  appendCapturedPoint(testCurrentStroke, testCanvasPoint(event));
  drawBlankTestCanvas();
}
function endTestDraw() {
  if (!testDrawing) return;
  testDrawing = false;
  if (testCurrentStroke.length > 2) testStrokes.push(testCurrentStroke);
  testCurrentStroke = [];
  $('#testStrokeCount').textContent = testStrokes.length;
  $('#submitDrawTest').disabled = testStrokes.length === 0;
  drawBlankTestCanvas();
}

function resetDrawTest() {
  testStrokes = [];
  testCurrentStroke = [];
  testSubmitted = false;
  recognitionBusy = false;
  lastRecognitionResult = null;
  $('#testStrokeCount').textContent = '0';
  $('#submitDrawTest').disabled = true;
  $('#submitDrawTest').hidden = false;
  $('#submitDrawTest').textContent = 'Kiểm tra chữ viết';
  $('#writingRecognition').hidden = true;
  $('#drawAnswer').hidden = true;
  drawBlankTestCanvas();
}

async function submitDrawTest() {
  if (!testStrokes.length) return showToast('Hãy viết chữ trước khi xem đáp án');
  if (recognitionBusy) return;
  recognitionBusy = true;
  const button = $('#submitDrawTest');
  button.disabled = true;
  button.textContent = 'Đang nhận diện…';
  setRecognitionStatus('checking', 'Đang nhận diện chữ viết', 'Chuẩn hóa nét và so sánh hình dáng ngay trên thiết bị…');
  if (document.fonts?.ready) await document.fonts.ready;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const step = getActiveDrawItem();
  if (!step) {
    recognitionBusy = false;
    return navigate(state.lessonMode ? 'character' : 'quiz');
  }
  const candidates = getLesson().characters.map(item => item.char);
  const result = recognizeKanaWriting(testStrokes, step.char, candidates);
  lastRecognitionResult = result;
  recognitionBusy = false;
  if (!result.correct) {
    const detail = writingFailureDetail(result, step.char);
    const kind = result.reason === 'glyph-shape' ? 'glyph-shape' : result.reason;
    const title = kind === 'glyph-shape' ? 'Chưa đúng mặt chữ' : kind === 'stroke-direction' ? 'Sai hướng nét' : 'Sai thứ tự nét';
    setRecognitionStatus('error', title, detail);
    button.disabled = false;
    button.textContent = 'Kiểm tra lại';
    showPracticeFailure(kind, detail, {
      item: step.item || findKanaItem(step.char),
      resumeRoute: state.drawMode === 'assessment' ? 'draw-test' : 'character-recognition',
      onRetry: resetDrawTest
    });
    return;
  }
  resetPracticeFailures();
  testSubmitted = true;
  if (state.drawMode === 'character') {
    setRecognitionStatus('success', `Đã học được cách viết chữ ${step.char}!`, `Hình dáng viết đúng · độ tin cậy ${result.confidence}%.`);
    button.hidden = true;
    return finishCharacterWritingStage(step);
  }
  setRecognitionStatus('success', 'Đã nhận diện đúng chữ', `Hình dáng khớp với ${step.char} · độ tin cậy ${result.confidence}%.`);
  button.hidden = true;
  $('#drawAnswer').hidden = false;
  $('#drawAnswer').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function finishCharacterWritingStage(completed = state.current) {
  const lesson = getLesson();
  const isLastCharacter = state.lessonCharIndex >= lesson.characters.length - 1;
  showModal(
    `Đã học được cách viết chữ ${completed.char}!`,
    isLastCharacter
      ? `Bạn đã luyện đủ 5 bước cho ${lesson.characters.length} chữ. Bây giờ hãy làm bài kiểm tra cuối nhóm để lưu các chữ đã thuộc.`
      : `Tiếp theo là chữ ${lesson.characters[state.lessonCharIndex + 1].char} — âm ${lesson.characters[state.lessonCharIndex + 1].romaji}.`,
    {
      actionLabel: isLastCharacter ? 'Làm bài kiểm tra' : 'Học chữ tiếp theo',
      onAction: () => {
        if (isLastCharacter) return startLessonQuiz();
        state.lessonCharIndex += 1;
        state.current = lesson.characters[state.lessonCharIndex];
        saveLearningState();
        navigate('character');
      }
    }
  );
}

function confirmDrawTest() {
  if (!testSubmitted || !lastRecognitionResult?.correct || state.drawMode === 'character') return;
  state.quizCorrect += 1;
  advanceAssessment();
}

function completeLesson() {
  const lesson = getLesson();
  state.completedLessons.add(lesson.id);
  lesson.characters.forEach(item => { state.known.add(item.char); state.learning.delete(item.char); });
  state.lessonMode = false;
  recordStudyDay();
  saveLearningState();
  navigate('complete');
}

function renderCompletion() {
  const lesson = getLesson();
  const next = curriculum[lessonIndexOf(lesson.id) + 1];
  $('#completeTitle').textContent = `Bạn đã thuộc ${lesson.title}!`;
  $('#completeMessage').textContent = `${lesson.characters.map(item => item.char).join('・')} đã được thêm vào bộ nhớ dài hạn.`;
  $('#completeAccuracy').textContent = `${Math.round((state.quizCorrect / Math.max(1, state.quizQuestions.length)) * 100)}%`;
  $('#completeChars').textContent = lesson.characters.length;
  if (next) {
    $('#nextUnlockGlyph').textContent = next.characters[0].char;
    $('#nextUnlockTitle').textContent = next.title;
    $('#continueNextLesson').hidden = false;
  } else {
    $('#nextUnlockGlyph').textContent = '祝'; $('#nextUnlockTitle').textContent = 'Toàn bộ lộ trình'; $('#continueNextLesson').hidden = true;
  }
}

function saveProgress() {
  localStorage.setItem('kana-known', JSON.stringify([...state.known]));
  $('#knownCount').textContent = `${state.known.size} chữ`;
  renderWeakStrip();
}
function saveLearningState() {
  saveProgress();
  localStorage.setItem('kana-completed-lessons', JSON.stringify([...state.completedLessons]));
  localStorage.setItem('kana-active-lesson', JSON.stringify({ id: state.activeLessonId, charIndex: state.lessonCharIndex, lessonMode: state.lessonMode }));
}

function getKnownItems() {
  const allItems = Object.values(kana).flatMap(script => Object.values(script).flat());
  const lookup = new Map(allItems.map(item => [item.char, item]));
  return [...state.known].map(char => lookup.get(char)).filter(Boolean);
}

function syncReviewAvailability() {
  const hasKnownCharacters = getKnownItems().length > 0;
  $('#smartReviewHeading').hidden = !hasKnownCharacters;
  $('#homeWeakStrip').hidden = !hasKnownCharacters;
  const reviewNav = $('#reviewNav');
  reviewNav.hidden = false;
  reviewNav.disabled = !hasKnownCharacters;
  reviewNav.setAttribute('aria-disabled', String(!hasKnownCharacters));
  reviewNav.setAttribute('aria-label', hasKnownCharacters ? 'Ôn tập' : 'Ôn tập đang khóa — hoàn thành một bài kiểm tra cuối để mở');
  reviewNav.title = hasKnownCharacters ? 'Ôn tập thông minh' : 'Hoàn thành một bài kiểm tra cuối để mở ôn tập';
  $('.bottom-nav').style.gridTemplateColumns = 'repeat(5, 1fr)';
}

function renderWeakStrip() {
  const knownItems = getKnownItems();
  syncReviewAvailability();
  if (!knownItems.length) {
    $('#homeWeakStrip').innerHTML = '';
    return;
  }
  const reviewItems = knownItems.slice(-3).reverse();
  $('#smartReviewTitle').textContent = `${reviewItems.length} chữ cần nhớ lại`;
  $('#homeWeakStrip').innerHTML = reviewItems.map(item => `<button class="weak-char" data-char="${item.char}"><b>${item.char}</b><small>${item.romaji}</small></button>`).join('');
  $$('.weak-char', $('#homeWeakStrip')).forEach(button => button.addEventListener('click', () => {
    const item = reviewItems.find(entry => entry.char === button.dataset.char);
    state.current = item;
    state.script = /[ァ-ヶ]/.test(item.char) ? 'katakana' : 'hiragana';
    state.lessonMode = false;
    navigate('character');
  }));
}

function renderReview() {
  const knownItems = getKnownItems();
  if (!knownItems.length) return navigate('home');
  const dueItems = knownItems.slice(-8).reverse();
  $('#reviewDueCount').textContent = dueItems.length;
  $('#reviewHeroMeta').textContent = `${dueItems.length} chữ · khoảng ${Math.max(1, Math.ceil(dueItems.length / 2))} phút`;
  $('#reviewStack').innerHTML = dueItems.slice(0, 3).map(item => `<span>${item.char}</span>`).join('');

  const pairDefinitions = [
    { chars: ['ぬ','め'], label: 'nu / me' }, { chars: ['シ','ツ'], label: 'shi / tsu' },
    { chars: ['ソ','ン'], label: 'so / n' }, { chars: ['あ','お'], label: 'a / o' },
    { chars: ['る','ろ'], label: 'ru / ro' }, { chars: ['さ','き'], label: 'sa / ki' }
  ];
  const knownPairs = pairDefinitions.filter(pair => pair.chars.every(char => state.known.has(char)));
  if (knownPairs.length) {
    $('#reviewFocusTitle').textContent = 'Những cặp dễ nhầm đã học';
    $('#reviewFocusList').innerHTML = knownPairs.map(pair => `<button data-compare="${pair.chars.join(',')}"><span class="pair-glyphs">${pair.chars[0]} <i>↔</i> ${pair.chars[1]}</span><span><b>${pair.label}</b><small>Đã học · Chạm để so sánh</small></span><em>→</em></button>`).join('');
    $$('[data-compare]', $('#reviewFocusList')).forEach(button => button.addEventListener('click', () => {
      const [a, b] = button.dataset.compare.split(',');
      showModal(`${a} và ${b}`, 'Quan sát hướng của các nét ngắn và điểm kết thúc. Hãy đọc to mỗi chữ trước khi chọn.');
    }));
  } else {
    $('#reviewFocusTitle').textContent = 'Chữ đến hạn';
    $('#reviewFocusList').innerHTML = dueItems.map(item => `<button data-review-char="${item.char}"><span class="pair-glyphs">${item.char}</span><span><b>${item.romaji}</b><small>Đã học · Chạm để luyện lại</small></span><em>→</em></button>`).join('');
    $$('[data-review-char]', $('#reviewFocusList')).forEach(button => button.addEventListener('click', () => {
      state.current = dueItems.find(item => item.char === button.dataset.reviewChar);
      state.script = /[ァ-ヶ]/.test(state.current.char) ? 'katakana' : 'hiragana';
      state.lessonMode = false;
      navigate('character');
    }));
  }
}

// Event wiring
$$('[data-route]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.route === 'quiz') return startLesson(getNextLesson().id);
  navigate(button.dataset.route);
}));
$$('[data-back]').forEach(button => button.addEventListener('click', () => navigate(button.dataset.back)));
$$('[data-action="start-lesson"]').forEach(button => button.addEventListener('click', () => startLesson(getNextLesson().id)));
$$('[data-action="start-review"]').forEach(button => button.addEventListener('click', startSmartReview));
$('#beginLesson').addEventListener('click', () => { const lesson = getLesson(); state.current = lesson.characters[state.lessonCharIndex]; navigate('character'); });
$('#continueNextLesson').addEventListener('click', () => { const next = curriculum[lessonIndexOf(state.activeLessonId) + 1]; if (next) startLesson(next.id); else navigate('home'); });

$$('[data-script]').forEach(button => button.addEventListener('click', () => {
  state.script = button.dataset.script; $$('[data-script]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-selected', b === button); }); renderChart();
}));
$$('[data-set]').forEach(button => button.addEventListener('click', () => { state.set = button.dataset.set; $$('[data-set]').forEach(b => b.classList.toggle('active', b === button)); renderChart(); }));
$$('[data-open-script]').forEach(button => button.addEventListener('click', () => { state.script = button.dataset.openScript; $$('[data-script]').forEach(b => { const active = b.dataset.script === state.script; b.classList.toggle('active', active); b.setAttribute('aria-selected', active); }); navigate('chart'); }));

$('#soundToggle').addEventListener('click', event => { state.sound = !state.sound; event.currentTarget.setAttribute('aria-pressed', state.sound); event.currentTarget.style.opacity = state.sound ? '1' : '.35'; showToast(state.sound ? 'Đã bật âm thanh' : 'Đã tắt âm thanh'); });
$('#speakChar').addEventListener('click', () => speak(state.current.char));
$('#speakWord').addEventListener('click', () => speak($('#exampleWord').textContent));
$('#quizSpeak').addEventListener('click', () => speak($('#quizGlyph').textContent));
$('#startPronunciation').addEventListener('click', startPronunciationRecognition);
$('#pronunciationContinue').addEventListener('click', () => { state.strokeDemoResumeRoute = null; navigate('stroke-demo'); });
$('#skipPronunciation').addEventListener('click', () => { resetPracticeFailures(); state.strokeDemoResumeRoute = null; showToast('Đã bỏ qua bước phát âm'); navigate('stroke-demo'); });
$('#favoriteButton').addEventListener('click', event => { state.learning.has(state.current.char) ? state.learning.delete(state.current.char) : state.learning.add(state.current.char); event.currentTarget.setAttribute('aria-pressed', state.learning.has(state.current.char)); showToast(state.learning.has(state.current.char) ? 'Đã thêm vào danh sách ôn' : 'Đã bỏ khỏi danh sách ôn'); });

$('#chartInfo').addEventListener('click', () => showModal('Đủ mọi nhóm Kana', 'Mỗi bảng có 46 chữ cơ bản. App còn tách riêng 25 biến âm, 33 âm ghép và các kana nhỏ — giúp bạn học hết nhưng không bị ngợp.'));
$('#modalClose').addEventListener('click', () => closeModal(false)); $('#modalOkay').addEventListener('click', () => closeModal(true)); $('#modalBackdrop').addEventListener('click', event => { if (event.target === event.currentTarget) closeModal(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

$('#traceCanvas').addEventListener('pointerdown', startDraw); $('#traceCanvas').addEventListener('pointermove', moveDraw); $('#traceCanvas').addEventListener('pointerup', endDraw); $('#traceCanvas').addEventListener('pointerleave', endDraw);
$('#clearCanvas').addEventListener('click', clearGuidedWriting);
$('#undoStroke').addEventListener('click', () => { strokes.pop(); $('#strokeCount').textContent=strokes.length; drawCanvas(); });
$('#showGuide').addEventListener('click', event => { guideVisible=!guideVisible; event.currentTarget.innerHTML = `<span aria-hidden="true">目</span> ${guideVisible ? 'Ẩn' : 'Hiện'} mẫu`; drawCanvas(); });
$('#checkWriting').addEventListener('click', submitGuidedWriting);
$('#checkAnswer').addEventListener('click', checkQuiz);

$('#testDrawCanvas').addEventListener('pointerdown', startTestDraw); $('#testDrawCanvas').addEventListener('pointermove', moveTestDraw); $('#testDrawCanvas').addEventListener('pointerup', endTestDraw); $('#testDrawCanvas').addEventListener('pointerleave', endTestDraw);
$('#undoTestStroke').addEventListener('click', () => { if (testSubmitted) return; testStrokes.pop(); $('#testStrokeCount').textContent = testStrokes.length; $('#submitDrawTest').disabled = testStrokes.length === 0; drawBlankTestCanvas(); });
$('#clearTestCanvas').addEventListener('click', resetDrawTest);
$('#submitDrawTest').addEventListener('click', submitDrawTest);
$('#retryDrawTest').addEventListener('click', resetDrawTest);
$('#confirmDrawTest').addEventListener('click', confirmDrawTest);

$$('[data-compare]').forEach(button => button.addEventListener('click', () => {
  const [a,b] = button.dataset.compare.split(','); showModal(`${a} và ${b}`, `Quan sát hướng của các nét ngắn và điểm kết thúc. Hãy đọc to mỗi chữ trước khi chọn để gắn hình dáng với âm thanh.`);
}));

try {
  const savedActive = JSON.parse(localStorage.getItem('kana-active-lesson') || 'null');
  if (savedActive && curriculum.some(lesson => lesson.id === savedActive.id) && !state.completedLessons.has(savedActive.id)) {
    state.activeLessonId = savedActive.id;
    state.lessonCharIndex = Math.max(0, Math.min(savedActive.charIndex || 0, getLesson(savedActive.id).characters.length - 1));
    state.lessonMode = Boolean(savedActive.lessonMode);
    state.current = getLesson(savedActive.id).characters[state.lessonCharIndex];
  }
} catch (_) {
  localStorage.removeItem('kana-active-lesson');
}

saveProgress(); renderStreak(); renderWeakStrip(); renderChart(); renderHome();

const previewParams = new URLSearchParams(window.location.search);
if (previewParams.has('script') && kana[previewParams.get('script')]) state.script = previewParams.get('script');
if (previewParams.has('set') && kana[state.script][previewParams.get('set')]) state.set = previewParams.get('set');
const initialScreen = previewParams.get('screen');
if (initialScreen && $(`[data-screen="${initialScreen}"]`)) {
  if (initialScreen === 'draw-test') {
    state.drawMode = previewParams.get('drawMode') === 'character' ? 'character' : 'assessment';
    if (state.drawMode === 'assessment') {
      state.quizMode = 'lesson';
      state.quizQuestions = buildLessonAssessment(getLesson());
      state.quizIndex = 1;
    }
  }
  $$('[data-script]').forEach(button => { const active = button.dataset.script === state.script; button.classList.toggle('active', active); button.setAttribute('aria-selected', active); });
  $$('[data-set]').forEach(button => button.classList.toggle('active', button.dataset.set === state.set));
  navigate(initialScreen);
}
