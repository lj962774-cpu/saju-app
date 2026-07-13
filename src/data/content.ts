// 사주 해석에 참고하는 일반 지식 콘텐츠 (오행 / 십신 / 일간별 캐릭터)
// 특정 저작물을 인용한 것이 아닌, 명리학에서 통용되는 개념을 캐주얼하게 정리한 해설입니다.

export interface WuxingDesc {
  title: string;
  emoji: string;
  keyword: string;
  desc: string;
  why: string; // 왜 이런 의미인지 (근거)
  strong: string; // 이 기운이 강할 때(많을 때)
  weak: string; // 이 기운이 약할 때(없을 때)
}

export const WUXING_DESC: Record<string, WuxingDesc> = {
  wood: {
    title: '목(木)',
    emoji: '🌳',
    keyword: '성장 · 추진력',
    desc: '위로 쭉쭉 뻗어나가는 기운. 계획 세우고 밀어붙이는 힘이 있어요.',
    why: '나무(木)는 위로 자라는 성질이 있어서 → 성장·시작·추진력을 상징해요.',
    strong: '추진력과 자기 주관이 강해요. 다만 너무 세면 고집·조급함으로 나올 수 있어요.',
    weak: '시작하는 힘이나 결단력이 약할 수 있어요. 계획만 세우다 미루는 편.',
  },
  fire: {
    title: '화(火)',
    emoji: '🔥',
    keyword: '열정 · 표현력',
    desc: '숨기지 못하는 텐션. 열정적이고 사교적인 에너지예요.',
    why: '불(火)은 밝게 타오르며 퍼지는 성질 → 열정·표현·사교성을 상징해요.',
    strong: '열정적이고 표현력이 좋아요. 과하면 감정 기복이나 욱하는 성격으로 나와요.',
    weak: '자기표현이 소극적이거나 열정에 불이 잘 안 붙는 편일 수 있어요.',
  },
  earth: {
    title: '토(土)',
    emoji: '⛰️',
    keyword: '안정 · 신뢰',
    desc: '든든하게 중심을 잡아주는 기운. 믿음직하고 인내심이 강해요.',
    why: '흙(土)은 만물을 담고 중재하는 성질 → 안정·신뢰·포용을 상징해요.',
    strong: '듬직하고 참을성이 강해요. 너무 세면 답답하거나 고집스러워 보일 수 있어요.',
    weak: '마음의 중심이나 안정감이 약해 쉽게 흔들릴 수 있어요.',
  },
  metal: {
    title: '금(金)',
    emoji: '⚙️',
    keyword: '결단 · 원칙',
    desc: '칼같이 딱 부러지는 기운. 원칙적이고 분석적이에요.',
    why: '쇠(金)는 단단하고 날카로운 성질 → 결단·원칙·분석력을 상징해요.',
    strong: '결단력 있고 원칙적이에요. 과하면 냉정하거나 비판적으로 보일 수 있어요.',
    weak: '결정을 잘 못 내리고 우유부단해질 수 있어요.',
  },
  water: {
    title: '수(水)',
    emoji: '💧',
    keyword: '지혜 · 유연함',
    desc: '흐르고 스며드는 기운. 눈치 빠르고 생각이 깊어요.',
    why: '물(水)은 흐르고 스며드는 성질 → 지혜·융통성·통찰을 상징해요.',
    strong: '머리가 좋고 융통성이 있어요. 과하면 생각이 너무 많아 우유부단해질 수 있어요.',
    weak: '융통성이나 임기응변이 부족할 수 있어요.',
  },
};

// 대운(10년 흐름)의 십신별 테마
export const DAYUN_THEME: Record<string, { emoji: string; title: string; desc: string }> = {
  '비견': { emoji: '🧍', title: '독립·자립의 시기', desc: '내 힘으로 밀어붙이는 때. 동료·경쟁자가 늘고 주체적으로 움직이게 돼요.' },
  '겁재': { emoji: '⚔️', title: '경쟁·도전의 시기', desc: '승부욕이 오르는 때. 기회도 많지만 돈 관리·동업은 조심해야 해요.' },
  '식신': { emoji: '🍀', title: '즐기고 표현하는 시기', desc: '하고 싶은 걸 벌이고 재능이 터지는 때. 여유롭고 먹을 복도 따라와요.' },
  '상관': { emoji: '💬', title: '재능 발산·변화의 시기', desc: '끼와 아이디어가 폭발하는 때. 틀을 깨고 새 길을 찾기 좋아요.' },
  '편재': { emoji: '💸', title: '기회·사업의 시기', desc: '돈과 기회가 활발히 도는 때. 활동적으로 벌이면 재물운이 열려요.' },
  '정재': { emoji: '💰', title: '안정·축적의 시기', desc: '꾸준히 모으고 자리 잡는 때. 성실함이 재산으로 쌓여요.' },
  '편관(칠살)': { emoji: '🛡️', title: '시험·도약의 시기', desc: '책임과 압박이 커지는 때. 잘 버티면 크게 도약하는 승부의 구간.' },
  '정관': { emoji: '🎖️', title: '명예·자리의 시기', desc: '직위·명예가 오르는 때. 조직에서 인정받고 자리를 잡기 좋아요.' },
  '편인': { emoji: '🔮', title: '배움·전환의 시기', desc: '공부·자격·전환이 어울리는 때. 남다른 분야에 눈뜨기 좋아요.' },
  '정인': { emoji: '📚', title: '충전·귀인의 시기', desc: '배우고 쉬어가는 때. 윗사람·귀인의 도움과 문서운이 따라와요.' },
};

export const SHISHEN_DESC: Record<string, { emoji: string; keyword: string; desc: string }> = {
  '비견': { emoji: '🤝', keyword: '독립·자존심', desc: '내 갈 길은 내가 정한다는 마이웨이 기질' },
  '겁재': { emoji: '⚡', keyword: '승부욕·추진력', desc: '지는 걸 싫어하는 강한 경쟁심' },
  '식신': { emoji: '🍀', keyword: '표현·여유', desc: '먹고 노는 것도 재능! 낙천적인 매력' },
  '상관': { emoji: '💬', keyword: '재치·자유분방', desc: '할 말은 하는 센스쟁이, 틀 밖을 좋아함' },
  '편재': { emoji: '💸', keyword: '사업 감각', desc: '기회를 알아보는 활동적인 재물운' },
  '정재': { emoji: '💰', keyword: '성실·관리', desc: '차곡차곡 모으는 알뜰한 살림꾼 스타일' },
  '편관(칠살)': { emoji: '🛡️', keyword: '돌파력', desc: '위기에 강한 승부사, 압박에도 버티는 힘' },
  '정관': { emoji: '🎖️', keyword: '책임감·명예', desc: '규칙을 지키는 모범생, 신뢰받는 타입' },
  '편인': { emoji: '🔮', keyword: '직관·개성', desc: '남들과 다른 시선, 독특한 재능러' },
  '정인': { emoji: '📚', keyword: '학문·인덕', desc: '배움과 귀인의 도움이 따르는 타입' },
};

export interface DayMasterInfo {
  name: string; // 캐릭터 이름
  emoji: string;
  tagline: string; // 한 줄 캐치프레이즈
  desc: string;
}

export const DAY_MASTER_DESC: Record<string, DayMasterInfo> = {
  '갑': { name: '큰 나무', emoji: '🌳', tagline: '타고난 리더, 곧게 뻗는 대장목', desc: '한번 정하면 안 굽히는 원칙주의 리더' },
  '을': { name: '유연한 화초', emoji: '🌿', tagline: '부드럽지만 절대 안 꺾이는 생존왕', desc: '눈치 빠르고 어디서든 적응하는 생존 마스터' },
  '병': { name: '태양', emoji: '☀️', tagline: '존재감 폭발, 에너지 만렙형', desc: '가는 곳마다 주인공, 텐션이 곧 무기' },
  '정': { name: '촛불', emoji: '🕯️', tagline: '은은하게 스며드는 감성 힐러', desc: '조용하지만 곁에 있으면 따뜻해지는 사람' },
  '무': { name: '큰 산', emoji: '⛰️', tagline: '묵직한 존재감, 믿고 기댈 수 있는 사람', desc: '흔들림 없이 자리를 지키는 든든한 존재' },
  '기': { name: '기름진 논밭', emoji: '🌾', tagline: '현실 감각 만점, 실속형 인간', desc: '겉멋보다 실속, 알뜰한 현실주의자' },
  '경': { name: '강철', emoji: '⚔️', tagline: '의리와 결단의 아이콘', desc: '한번 마음먹으면 끝까지 가는 강단파' },
  '신': { name: '보석', emoji: '💎', tagline: '예민하지만 세련된 완벽주의자', desc: '트렌드에 빠삭한 반짝이는 감각파' },
  '임': { name: '큰 바다', emoji: '🌊', tagline: '스케일이 다른 지혜형 인간', desc: '속은 깊고 그릇은 큰 신비주의자' },
  '계': { name: '맑은 이슬', emoji: '💧', tagline: '섬세한 통찰의 힐러', desc: '조용히 스며들어 신뢰를 얻는 타입' },
};
