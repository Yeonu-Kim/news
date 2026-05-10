export type CategoryKey = '종합/경제' | '방송/통신' | 'IT' | '스포츠/연예' | '매거진/전문지' | '지역'

export interface PressWordmarkConfig {
  name: string
  color: string
  bg?: string
  weight: 400 | 500 | 700
  family: 'sans' | 'serif'
  italic?: boolean
  tracking?: string
  accent?: string
  accentChar?: number
  accentUnder?: number[]
  accentBg?: boolean
  flag?: boolean
  latin?: boolean
  small?: boolean
}

export interface Press {
  id: number
  name: string
  wordmark: PressWordmarkConfig
  mainCategory: CategoryKey
}

function w(name: string, overrides: Partial<PressWordmarkConfig> = {}): PressWordmarkConfig {
  return { name, color: '#14212B', weight: 700, family: 'sans', ...overrides }
}

export const presses: Press[] = [
  // Page 1
  { id: 1,  name: '서울경제',           wordmark: w('서울경제'),                                                         mainCategory: '종합/경제' },
  { id: 2,  name: '데일리안',           wordmark: w('데일리안'),                                                         mainCategory: '종합/경제' },
  { id: 3,  name: '헤럴드경제',         wordmark: w('헤럴드경제'),                                                       mainCategory: '종합/경제' },
  { id: 4,  name: 'SBS Biz',           wordmark: w('SBS Biz',           { color: '#D11D40', small: true, latin: true }), mainCategory: '방송/통신' },
  { id: 5,  name: '세계일보',           wordmark: w('세계일보'),                                                         mainCategory: '종합/경제' },
  { id: 6,  name: '아시아경제',         wordmark: w('아시아경제',        { flag: true }),                                 mainCategory: '종합/경제' },
  { id: 7,  name: '이데일리',           wordmark: w('이데일리'),                                                         mainCategory: '종합/경제' },
  { id: 8,  name: '朝鮮日報',           wordmark: w('朝鮮日報',          { family: 'serif', tracking: '0.08em' }),        mainCategory: '종합/경제' },
  { id: 9,  name: '아이뉴스24',         wordmark: w('아이뉴스24'),                                                       mainCategory: 'IT' },
  { id: 10, name: '파이낸셜뉴스',       wordmark: w('파이낸셜뉴스'),                                                     mainCategory: '종합/경제' },
  { id: 11, name: '스포츠서울',         wordmark: w('스포츠서울'),                                                       mainCategory: '스포츠/연예' },
  { id: 12, name: '스포츠동아',         wordmark: w('스포츠동아'),                                                       mainCategory: '스포츠/연예' },
  { id: 13, name: '석간문화일보',       wordmark: w('석간문화일보',      { small: true }),                                mainCategory: '종합/경제' },
  { id: 14, name: 'KBS WORLD',          wordmark: w('KBS WORLD',         { bg: '#003082', color: '#FFFFFF', latin: true }), mainCategory: '방송/통신' },
  { id: 15, name: 'Korea JoongAng Daily', wordmark: w('Korea JoongAng Daily', { small: true, latin: true }),             mainCategory: '종합/경제' },
  { id: 16, name: 'Insight',            wordmark: w('Insight',           { family: 'serif', italic: true, latin: true }), mainCategory: '매거진/전문지' },
  { id: 17, name: '법률방송뉴스',       wordmark: w('법률방송뉴스',      { small: true }),                                mainCategory: '방송/통신' },
  { id: 18, name: '시사저널e.',         wordmark: w('시사저널e.'),                                                       mainCategory: '매거진/전문지' },
  { id: 19, name: '한국농어촌방송',     wordmark: w('한국농어촌방송',    { small: true }),                                mainCategory: '방송/통신' },
  { id: 20, name: '조이뉴스24',         wordmark: w('조이뉴스24',        { color: '#E60012' }),                           mainCategory: '스포츠/연예' },
  { id: 21, name: '에너지경제',         wordmark: w('에너지경제'),                                                       mainCategory: '종합/경제' },
  { id: 22, name: 'BUSINESS POST',      wordmark: w('BUSINESS POST',     { small: true, latin: true }),                  mainCategory: '종합/경제' },
  { id: 23, name: 'CEO스코어데일리',    wordmark: w('CEO스코어데일리',   { small: true }),                                mainCategory: '종합/경제' },
  { id: 24, name: 'KNN',               wordmark: w('KNN',                { color: '#003087', latin: true }),             mainCategory: '방송/통신' },

  // Page 2
  { id: 25, name: 'The Korea Herald',   wordmark: w('The Korea Herald',  { small: true, latin: true }),                  mainCategory: '종합/경제' },
  { id: 26, name: 'MBC',               wordmark: w('MBC',               { color: '#0066B3', latin: true }),             mainCategory: '방송/통신' },
  { id: 27, name: '뉴스타파',           wordmark: w('뉴스타파'),                                                         mainCategory: '종합/경제' },
  { id: 28, name: 'NewDaily',          wordmark: w('NewDaily',          { latin: true }),                               mainCategory: '종합/경제' },
  { id: 29, name: '국민일보',           wordmark: w('국민일보'),                                                         mainCategory: '종합/경제' },
  { id: 30, name: '일간스포츠',         wordmark: w('일간스포츠'),                                                       mainCategory: '스포츠/연예' },
  { id: 31, name: '경향신문',           wordmark: w('경향신문'),                                                         mainCategory: '종합/경제' },
  { id: 32, name: 'ZDNET Korea',        wordmark: w('ZDNET Korea',       { small: true, latin: true }),                  mainCategory: 'IT' },
  { id: 33, name: 'mydaily',            wordmark: w('mydaily',           { latin: true }),                               mainCategory: '스포츠/연예' },
  { id: 34, name: 'MT머니투데이',       wordmark: w('MT머니투데이'),                                                     mainCategory: '종합/경제' },
  { id: 35, name: 'SBS',               wordmark: w('SBS',               { color: '#D11D40', latin: true }),             mainCategory: '방송/통신' },
  { id: 36, name: 'OhmyNews',           wordmark: w('OhmyNews',         { small: true, latin: true }),                  mainCategory: '종합/경제' },
  { id: 37, name: '매일경제',           wordmark: w('매일경제'),                                                         mainCategory: '종합/경제' },
  { id: 38, name: 'MBN',               wordmark: w('MBN',               { latin: true }),                               mainCategory: '방송/통신' },
  { id: 39, name: 'YTN',               wordmark: w('YTN',               { color: '#E8402A', latin: true }),             mainCategory: '방송/통신' },
  { id: 40, name: '시사위크',           wordmark: w('시사위크'),                                                         mainCategory: '매거진/전문지' },
  { id: 41, name: 'Digital Today',      wordmark: w('Digital Today',     { small: true, latin: true }),                  mainCategory: 'IT' },
  { id: 42, name: 'dataNews',           wordmark: w('dataNews',          { small: true, latin: true }),                  mainCategory: 'IT' },
  { id: 43, name: '한국대학신문',       wordmark: w('한국대학신문',      { small: true }),                                mainCategory: '매거진/전문지' },
  { id: 44, name: '서울파이낸스',       wordmark: w('서울파이낸스'),                                                     mainCategory: '종합/경제' },
  { id: 45, name: '엑스포츠뉴스',       wordmark: w('엑스포츠뉴스'),                                                     mainCategory: '스포츠/연예' },
  { id: 46, name: '맥스무비',           wordmark: w('맥스무비'),                                                         mainCategory: '스포츠/연예' },
  { id: 47, name: 'OBS',               wordmark: w('OBS',               { latin: true }),                               mainCategory: '방송/통신' },
  { id: 48, name: '소년한국일보',       wordmark: w('소년한국일보',      { small: true }),                                mainCategory: '종합/경제' },

  // Page 3
  { id: 49, name: '연합뉴스',           wordmark: w('연합뉴스'),                                                         mainCategory: '종합/경제' },
  { id: 50, name: '뉴시스',             wordmark: w('뉴시스'),                                                           mainCategory: '종합/경제' },
  { id: 51, name: '한겨레',             wordmark: w('한겨레'),                                                           mainCategory: '종합/경제' },
  { id: 52, name: '중앙일보',           wordmark: w('중앙일보'),                                                         mainCategory: '종합/경제' },
  { id: 53, name: '동아일보',           wordmark: w('동아일보'),                                                         mainCategory: '종합/경제' },
  { id: 54, name: '한국일보',           wordmark: w('한국일보'),                                                         mainCategory: '종합/경제' },
  { id: 55, name: '문화일보',           wordmark: w('문화일보'),                                                         mainCategory: '종합/경제' },
  { id: 56, name: 'CBS',               wordmark: w('CBS',               { latin: true }),                               mainCategory: '방송/통신' },
  { id: 57, name: 'tbs',               wordmark: w('tbs',               { latin: true }),                               mainCategory: '방송/통신' },
  { id: 58, name: '뉴스1',             wordmark: w('뉴스1'),                                                             mainCategory: '종합/경제' },
  { id: 59, name: '이투데이',           wordmark: w('이투데이'),                                                         mainCategory: '종합/경제' },
  { id: 60, name: '더팩트',             wordmark: w('더팩트'),                                                           mainCategory: '종합/경제' },
  { id: 61, name: '뉴스핌',             wordmark: w('뉴스핌'),                                                           mainCategory: '종합/경제' },
  { id: 62, name: '글로벌이코노믹',     wordmark: w('글로벌이코노믹',    { small: true }),                                mainCategory: '종합/경제' },
  { id: 63, name: '아주경제',           wordmark: w('아주경제'),                                                         mainCategory: '종합/경제' },
  { id: 64, name: '브릿지경제',         wordmark: w('브릿지경제'),                                                       mainCategory: '종합/경제' },
  { id: 65, name: '국제신문',           wordmark: w('국제신문'),                                                         mainCategory: '지역' },
  { id: 66, name: '부산일보',           wordmark: w('부산일보'),                                                         mainCategory: '지역' },
  { id: 67, name: '조선비즈',           wordmark: w('조선비즈'),                                                         mainCategory: '종합/경제' },
  { id: 68, name: '매경이코노미',       wordmark: w('매경이코노미',      { small: true }),                                mainCategory: '매거진/전문지' },
  { id: 69, name: '한경비즈니스',       wordmark: w('한경비즈니스',      { small: true }),                                mainCategory: '매거진/전문지' },
  { id: 70, name: '머니투데이',         wordmark: w('머니투데이'),                                                       mainCategory: '종합/경제' },
  { id: 71, name: '비즈니스워치',       wordmark: w('비즈니스워치',      { small: true }),                                mainCategory: '종합/경제' },
  { id: 72, name: '인사이트코리아',     wordmark: w('인사이트코리아',    { small: true }),                                mainCategory: '매거진/전문지' },
]

export const pressesByCategory: Record<CategoryKey, Press[]> = {
  '종합/경제': [],
  '방송/통신': [],
  IT: [],
  '스포츠/연예': [],
  '매거진/전문지': [],
  지역: [],
}

export const CATEGORIES: CategoryKey[] = [
  '종합/경제',
  '방송/통신',
  'IT',
  '스포츠/연예',
  '매거진/전문지',
  '지역',
]

for (const press of presses) {
  pressesByCategory[press.mainCategory].push(press)
}
