(function () {
  const row = (chars, romaji, label) => Array.from(chars).map((char, i) => ({ char, romaji: romaji[i], row: label }));
  const group = (id, script, set, title, subtitle, chars, romaji) => ({
    id, script, set, title, subtitle, characters: row(chars, romaji, title)
  });
  const itemGroup = (id, script, set, title, subtitle, characters) => ({ id, script, set, title, subtitle, characters });
  const splitRows = (items) => [...new Set(items.map(item => item.row))].map(label => items.filter(item => item.row === label));

  const hiragana = {
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
      ...row(['きゃ','きゅ','きょ'], ['kya','kyu','kyo'], 'Âm ghép K'), ...row(['しゃ','しゅ','しょ'], ['sha','shu','sho'], 'Âm ghép S'),
      ...row(['ちゃ','ちゅ','ちょ'], ['cha','chu','cho'], 'Âm ghép T'), ...row(['にゃ','にゅ','にょ'], ['nya','nyu','nyo'], 'Âm ghép N'),
      ...row(['ひゃ','ひゅ','ひょ'], ['hya','hyu','hyo'], 'Âm ghép H'), ...row(['みゃ','みゅ','みょ'], ['mya','myu','myo'], 'Âm ghép M'),
      ...row(['りゃ','りゅ','りょ'], ['rya','ryu','ryo'], 'Âm ghép R'), ...row(['ぎゃ','ぎゅ','ぎょ'], ['gya','gyu','gyo'], 'Âm ghép G'),
      ...row(['じゃ','じゅ','じょ'], ['ja','ju','jo'], 'Âm ghép J'), ...row(['びゃ','びゅ','びょ'], ['bya','byu','byo'], 'Âm ghép B'),
      ...row(['ぴゃ','ぴゅ','ぴょ'], ['pya','pyu','pyo'], 'Âm ghép P')
    ],
    marks: row(['っ','ゃ','ゅ','ょ','ぁ','ぃ','ぅ','ぇ','ぉ','ゎ'], ['tsu nhỏ','ya nhỏ','yu nhỏ','yo nhỏ','a nhỏ','i nhỏ','u nhỏ','e nhỏ','o nhỏ','wa nhỏ'], 'Kana nhỏ')
  };

  const katakana = {
    basic: [
      ...row('アイウエオ', ['a','i','u','e','o'], 'Nguyên âm'), ...row('カキクケコ', ['ka','ki','ku','ke','ko'], 'Hàng K'),
      ...row('サシスセソ', ['sa','shi','su','se','so'], 'Hàng S'), ...row('タチツテト', ['ta','chi','tsu','te','to'], 'Hàng T'),
      ...row('ナニヌネノ', ['na','ni','nu','ne','no'], 'Hàng N'), ...row('ハヒフヘホ', ['ha','hi','fu','he','ho'], 'Hàng H'),
      ...row('マミムメモ', ['ma','mi','mu','me','mo'], 'Hàng M'), ...row('ヤユヨ', ['ya','yu','yo'], 'Hàng Y'),
      ...row('ラリルレロ', ['ra','ri','ru','re','ro'], 'Hàng R'), ...row('ワヲン', ['wa','wo','n'], 'Hàng W / N')
    ],
    voiced: [
      ...row('ガギグゲゴ', ['ga','gi','gu','ge','go'], 'Hàng G'), ...row('ザジズゼゾ', ['za','ji','zu','ze','zo'], 'Hàng Z'),
      ...row('ダヂヅデド', ['da','ji','zu','de','do'], 'Hàng D'), ...row('バビブベボ', ['ba','bi','bu','be','bo'], 'Hàng B'),
      ...row('パピプペポ', ['pa','pi','pu','pe','po'], 'Hàng P')
    ],
    combo: [
      ...row(['キャ','キュ','キョ'], ['kya','kyu','kyo'], 'Âm ghép K'), ...row(['シャ','シュ','ショ'], ['sha','shu','sho'], 'Âm ghép S'),
      ...row(['チャ','チュ','チョ'], ['cha','chu','cho'], 'Âm ghép T'), ...row(['ニャ','ニュ','ニョ'], ['nya','nyu','nyo'], 'Âm ghép N'),
      ...row(['ヒャ','ヒュ','ヒョ'], ['hya','hyu','hyo'], 'Âm ghép H'), ...row(['ミャ','ミュ','ミョ'], ['mya','myu','myo'], 'Âm ghép M'),
      ...row(['リャ','リュ','リョ'], ['rya','ryu','ryo'], 'Âm ghép R'), ...row(['ギャ','ギュ','ギョ'], ['gya','gyu','gyo'], 'Âm ghép G'),
      ...row(['ジャ','ジュ','ジョ'], ['ja','ju','jo'], 'Âm ghép J'), ...row(['ビャ','ビュ','ビョ'], ['bya','byu','byo'], 'Âm ghép B'),
      ...row(['ピャ','ピュ','ピョ'], ['pya','pyu','pyo'], 'Âm ghép P')
    ],
    marks: row(['ッ','ャ','ュ','ョ','ァ','ィ','ゥ','ェ','ォ','ヮ','ー','ヴ'], ['tsu nhỏ','ya nhỏ','yu nhỏ','yo nhỏ','a nhỏ','i nhỏ','u nhỏ','e nhỏ','o nhỏ','wa nhỏ','âm dài','vu'], 'Ký hiệu Katakana')
  };

  const curriculum = [
    group('hira-vowels', 'hiragana', 'basic', 'Nguyên âm', 'Khởi đầu với 5 âm nền tảng', 'あいうえお', ['a','i','u','e','o']),
    group('hira-k', 'hiragana', 'basic', 'Hàng K', 'Ghép phụ âm k với năm nguyên âm', 'かきくけこ', ['ka','ki','ku','ke','ko']),
    group('hira-s', 'hiragana', 'basic', 'Hàng S', 'Lưu ý âm đặc biệt shi', 'さしすせそ', ['sa','shi','su','se','so']),
    group('hira-t', 'hiragana', 'basic', 'Hàng T', 'Lưu ý chi và tsu', 'たちつてと', ['ta','chi','tsu','te','to']),
    group('hira-n', 'hiragana', 'basic', 'Hàng N', 'Năm âm đều theo quy tắc', 'なにぬねの', ['na','ni','nu','ne','no']),
    group('hira-h', 'hiragana', 'basic', 'Hàng H', 'Âm fu là ngoại lệ quan trọng', 'はひふへほ', ['ha','hi','fu','he','ho']),
    group('hira-m', 'hiragana', 'basic', 'Hàng M', 'Nhận diện các nét cong gần nhau', 'まみむめも', ['ma','mi','mu','me','mo']),
    group('hira-y', 'hiragana', 'basic', 'Hàng Y', 'Ba âm ya, yu, yo', 'やゆよ', ['ya','yu','yo']),
    group('hira-r', 'hiragana', 'basic', 'Hàng R', 'Âm r nhẹ của tiếng Nhật', 'らりるれろ', ['ra','ri','ru','re','ro']),
    group('hira-w', 'hiragana', 'basic', 'Hàng W và N', 'Hoàn tất Hiragana cơ bản', 'わをん', ['wa','wo','n']),
    group('hira-g', 'hiragana', 'voiced', 'Biến âm G', 'Thêm dakuten vào hàng K', 'がぎぐげご', ['ga','gi','gu','ge','go']),
    group('hira-z', 'hiragana', 'voiced', 'Biến âm Z', 'Thêm dakuten vào hàng S', 'ざじずぜぞ', ['za','ji','zu','ze','zo']),
    group('hira-d', 'hiragana', 'voiced', 'Biến âm D', 'Thêm dakuten vào hàng T', 'だぢづでど', ['da','ji','zu','de','do']),
    group('hira-b', 'hiragana', 'voiced', 'Biến âm B', 'Thêm dakuten vào hàng H', 'ばびぶべぼ', ['ba','bi','bu','be','bo']),
    group('hira-p', 'hiragana', 'voiced', 'Biến âm P', 'Thêm handakuten vào hàng H', 'ぱぴぷぺぽ', ['pa','pi','pu','pe','po']),
    group('kata-vowels', 'katakana', 'basic', 'Katakana: Nguyên âm', 'Bắt đầu bảng chữ dùng cho từ ngoại lai', 'アイウエオ', ['a','i','u','e','o']),
    group('kata-k', 'katakana', 'basic', 'Katakana: Hàng K', 'Năm âm K trong Katakana', 'カキクケコ', ['ka','ki','ku','ke','ko']),
    group('kata-s', 'katakana', 'basic', 'Katakana: Hàng S', 'Phân biệt シ với ツ', 'サシスセソ', ['sa','shi','su','se','so']),
    group('kata-t', 'katakana', 'basic', 'Katakana: Hàng T', 'Năm âm T trong Katakana', 'タチツテト', ['ta','chi','tsu','te','to']),
    group('kata-n', 'katakana', 'basic', 'Katakana: Hàng N', 'Phân biệt ン với ソ', 'ナニヌネノ', ['na','ni','nu','ne','no']),
    group('kata-h', 'katakana', 'basic', 'Katakana: Hàng H', 'Năm âm H trong Katakana', 'ハヒフヘホ', ['ha','hi','fu','he','ho']),
    group('kata-m', 'katakana', 'basic', 'Katakana: Hàng M', 'Năm âm M trong Katakana', 'マミムメモ', ['ma','mi','mu','me','mo']),
    group('kata-y', 'katakana', 'basic', 'Katakana: Hàng Y', 'Ba âm ya, yu, yo', 'ヤユヨ', ['ya','yu','yo']),
    group('kata-r', 'katakana', 'basic', 'Katakana: Hàng R', 'Năm âm R trong Katakana', 'ラリルレロ', ['ra','ri','ru','re','ro']),
    group('kata-w', 'katakana', 'basic', 'Katakana: W và N', 'Hoàn tất Katakana cơ bản', 'ワヲン', ['wa','wo','n'])
  ];

  const hiraganaAdvanced = [
    ...splitRows(hiragana.combo).map((characters, index) => itemGroup(`hira-combo-${index + 1}`, 'hiragana', 'combo', characters[0].row, 'Ghép với ゃ, ゅ hoặc ょ nhỏ', characters)),
    itemGroup('hira-marks', 'hiragana', 'marks', 'Hiragana nhỏ', 'Các kana nhỏ dùng để biến đổi âm', hiragana.marks)
  ];
  curriculum.splice(15, 0, ...hiraganaAdvanced);

  const katakanaAdvanced = [
    ...splitRows(katakana.voiced).map((characters, index) => itemGroup(`kata-voiced-${index + 1}`, 'katakana', 'voiced', `Katakana: ${characters[0].row}`, 'Katakana có dakuten hoặc handakuten', characters)),
    ...splitRows(katakana.combo).map((characters, index) => itemGroup(`kata-combo-${index + 1}`, 'katakana', 'combo', `Katakana: ${characters[0].row}`, 'Âm ghép thường gặp trong từ ngoại lai', characters)),
    itemGroup('kata-marks', 'katakana', 'marks', 'Ký hiệu Katakana', 'Kana nhỏ, âm dài và âm vu', katakana.marks)
  ];
  curriculum.push(...katakanaAdvanced);

  window.KANA_DB = {
    version: 2,
    scripts: { hiragana, katakana },
    curriculum,
    totals: {
      hiragana: Object.values(hiragana).reduce((sum, list) => sum + list.length, 0),
      katakana: Object.values(katakana).reduce((sum, list) => sum + list.length, 0),
      lessons: curriculum.length
    }
  };
})();
