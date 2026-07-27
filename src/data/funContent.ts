import type { SajuResult, WuxingCount } from '../lib/saju';
import { pick, randRange, seededRandom } from '../lib/seed';

export interface FortuneCard {
  emoji: string;
  headline: string;
  score?: number; // 0-100
  subline: string;
  color?: string; // 행운의 색 견본용 hex
}

function baseSeed(result: SajuResult): string {
  return `${result.solarDate}-${result.dayMasterGan}-${result.animal}`;
}

function shishenCount(result: SajuResult, names: string[]): number {
  const pillars = [
    result.yearPillar,
    result.monthPillar,
    result.dayPillar,
    ...(result.timePillar ? [result.timePillar] : []),
  ];
  let n = 0;
  for (const p of pillars) {
    if (names.includes(p.shiShenGan)) n++;
    n += p.shiShenZhi.filter((s) => names.includes(s)).length;
  }
  return n;
}

const WEALTH_LINES = [
  '지갑은 가벼워도 마음은 이미 부자',
  '이번 생엔 로또보다 적금이 진리',
  '돈이 스스로 나를 찾아오는 스타일',
  '짠테크보다 플렉스가 어울리는 타입',
  '통장 잔고보다 인복이 진짜 자산',
  '큰돈보다 꾸준한 현금흐름이 체질',
  '재물운은 늦게 터지는 대기만성형',
];

const LOVE_LINES = [
  '썸만 타다 끝나는 밀당 고수',
  '한번 빠지면 올인하는 순정파',
  '연애보다 자기 일이 우선인 타입',
  '주변에 대시가 끊이지 않는 인기형',
  '늦게 피는 대신 오래가는 사랑',
  '밀당 없이 직진하는 스타일',
  '연애운은 이번 대운부터 급상승',
];

const STUDY_LINES = [
  '벼락치기의 신, 몰아서 한 방에',
  '꾸준함으로 이기는 우직한 스타일',
  '이론보다 몸으로 배우는 실전파',
  '한 우물만 파면 대성하는 타입',
  '호기심 대마왕, 다방면에 관심 폭발',
  '시험운보다 실력운이 강한 편',
];

const FIT_BY_ELEMENT: Record<keyof WuxingCount, string[]> = {
  wood: ['기획', '창업', '스타트업', '디자인'],
  fire: ['마케팅', '방송·미디어', '영업', '엔터테인먼트'],
  earth: ['부동산', '공무원·행정', '중개·컨설팅', '교육'],
  metal: ['금융', '법조', 'IT 개발', '엔지니어링'],
  water: ['연구직', '무역', '작가·기획', '심리·상담'],
};

const JOB_ENDURANCE_LINES = [
  '딱 1년, 그 이상은 못 참는 스타일',
  '2~3년 국룰 텀으로 이직 각',
  '적응만 하면 5년은 거뜬한 타입',
  '한번 자리잡으면 뼈를 묻는 스타일',
  '마음은 늘 퇴사인데 몸은 출근',
];

const AWESOME_TIERS: [number, string][] = [
  [95, '이미 전설 그 자체 🐐'],
  [85, '주변에서 이미 인정하는 인싸력'],
  [70, '은근히 다 갖춘 능력자'],
  [55, '숨겨진 잠재력이 아직 안 터진 타입'],
  [40, '노력형 대기만성, 곧 터짐'],
];

export function getWealthFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-wealth`);
  const bonus = shishenCount(result, ['편재', '정재']) * 4;
  const score = Math.min(99, randRange(rng, 45, 88) + bonus);
  return { emoji: '💰', headline: pick(rng, WEALTH_LINES), score, subline: `재물운 지수 ${score}%` };
}

export function getLoveFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-love`);
  const bonus = shishenCount(result, ['정관', '편관(칠살)', '식신', '상관']) * 3;
  const score = Math.min(99, randRange(rng, 45, 88) + bonus);
  return { emoji: '💕', headline: pick(rng, LOVE_LINES), score, subline: `연애운 지수 ${score}%` };
}

export function getStudyFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-study`);
  const bonus = shishenCount(result, ['정인', '편인']) * 4;
  const score = Math.min(99, randRange(rng, 45, 88) + bonus);
  return { emoji: '📚', headline: pick(rng, STUDY_LINES), score, subline: `학업운 지수 ${score}%` };
}

export function getPeakFortune(result: SajuResult): FortuneCard {
  // 재물·성취와 관련된 십신(재성/식상/정관) 대운을 황금기로 우선 지목
  const goodThemes = ['편재', '정재', '식신', '상관', '정관'];
  const peak =
    result.daYunList.find((d) => goodThemes.includes(d.shiShen)) ??
    result.daYunList[Math.floor(result.daYunList.length / 2)];
  if (!peak) return { emoji: '🌅', headline: '지금이 바로 그 타이밍!', subline: '대운 흐름으로 본 인생 황금기' };
  return {
    emoji: '🌅',
    headline: `${peak.startAge}세 ~ ${peak.endAge}세가 인생 급상승 구간!`,
    subline: `${peak.themeTitle} — ${peak.themeDesc}`,
  };
}

// ---------- 타로 ----------

interface TarotCard {
  emoji: string;
  name: string;
  meaning: string;
}

const TAROT_DECK: TarotCard[] = [
  { emoji: '🃏', name: '광대 (The Fool)', meaning: '겁 없이 새로운 시작을 던질 타이밍' },
  { emoji: '🎩', name: '마법사 (The Magician)', meaning: '가진 재능을 제대로 써먹을 때가 왔어요' },
  { emoji: '🌙', name: '여사제 (The High Priestess)', meaning: '직감이 유난히 잘 맞는 시기, 촉을 믿어봐요' },
  { emoji: '👑', name: '여황제 (The Empress)', meaning: '풍요와 애정운이 무르익는 흐름' },
  { emoji: '🏛️', name: '황제 (The Emperor)', meaning: '주도권을 쥐고 밀어붙이면 통하는 때' },
  { emoji: '💞', name: '연인 (The Lovers)', meaning: '중요한 선택과 인연의 기운이 감돌아요' },
  { emoji: '🏇', name: '전차 (The Chariot)', meaning: '망설이지 말고 정면 돌파하면 이겨요' },
  { emoji: '🦁', name: '힘 (Strength)', meaning: '부드럽지만 단단한 뚝심이 빛나는 시기' },
  { emoji: '🏮', name: '은둔자 (The Hermit)', meaning: '잠시 혼자만의 정비 시간이 필요해요' },
  { emoji: '🎡', name: '운명의 수레바퀴 (Wheel of Fortune)', meaning: '흐름이 바뀌는 전환점, 기회를 잡아요' },
  { emoji: '⭐', name: '별 (The Star)', meaning: '희망과 회복의 기운, 바라던 게 이뤄질 조짐' },
  { emoji: '☀️', name: '태양 (The Sun)', meaning: '뭘 해도 잘 풀리는 최상의 행운 카드' },
  { emoji: '🌍', name: '세계 (The World)', meaning: '한 사이클을 완성하고 결실을 맺는 때' },
];

export function getTarotFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-tarot`);
  const card = pick(rng, TAROT_DECK);
  return {
    emoji: card.emoji,
    headline: `오늘의 타로: ${card.name}`,
    subline: card.meaning,
  };
}

// ---------- 행운의 색 ----------

// 일간(천간) 한자 → 오행
const GAN_ELEMENT: Record<string, keyof WuxingCount> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
};

const LUCK_COLORS: Record<keyof WuxingCount, { name: string; hex: string }[]> = {
  wood: [
    { name: '싱그러운 초록', hex: '#4caf50' },
    { name: '민트 청록', hex: '#26a69a' },
    { name: '라임 그린', hex: '#8bc34a' },
  ],
  fire: [
    { name: '정열의 레드', hex: '#e53935' },
    { name: '코랄 핑크', hex: '#ff5c8a' },
    { name: '선명한 오렌지', hex: '#fb8c00' },
  ],
  earth: [
    { name: '따뜻한 옐로', hex: '#fdd835' },
    { name: '베이지 브라운', hex: '#a1887f' },
    { name: '골든 카키', hex: '#c0a35e' },
  ],
  metal: [
    { name: '깨끗한 화이트', hex: '#f5f5f5' },
    { name: '샴페인 골드', hex: '#d4af37' },
    { name: '실버 그레이', hex: '#b0bec5' },
  ],
  water: [
    { name: '깊은 네이비', hex: '#1a237e' },
    { name: '시원한 블루', hex: '#1e88e5' },
    { name: '차분한 블랙', hex: '#212121' },
  ],
};

export function getLuckColorFortune(result: SajuResult): FortuneCard {
  const element = GAN_ELEMENT[result.dayMasterGan] ?? 'wood';
  const rng = seededRandom(`${baseSeed(result)}-luckcolor`);
  const color = pick(rng, LUCK_COLORS[element]);
  return {
    emoji: '🎨',
    headline: `행운의 색은 '${color.name}'`,
    subline: '이 색을 곁에 두면 좋은 기운이 따라와요',
    color: color.hex,
  };
}

export function getAwesomeFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-awesome`);
  const score = randRange(rng, 38, 99);
  const tier = AWESOME_TIERS.find(([min]) => score >= min) ?? AWESOME_TIERS[AWESOME_TIERS.length - 1];
  return { emoji: '🔥', headline: tier[1], score, subline: `개쩌는 지수 ${score}%` };
}

export function getLottoFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-lotto`);
  const percent = (randRange(rng, 1, 900) / 10000).toFixed(4);
  return {
    emoji: '🎰',
    headline: `이번 주 로또 당첨 확률 ${percent}%`,
    subline: '과학적 근거 1도 없는 순수 재미용 수치예요 😄',
  };
}

export function getJobEnduranceFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-job`);
  return { emoji: '🏢', headline: pick(rng, JOB_ENDURANCE_LINES), subline: '지금 회사, 존버 지수 체크' };
}

export function getFitFortune(result: SajuResult): FortuneCard {
  const rng = seededRandom(`${baseSeed(result)}-fit`);
  const top = (Object.keys(result.wuxingCount) as (keyof WuxingCount)[]).reduce((a, b) =>
    result.wuxingCount[b] > result.wuxingCount[a] ? b : a,
  );
  const field = pick(rng, FIT_BY_ELEMENT[top]);
  const score = randRange(rng, 62, 96);
  return {
    emoji: '🎯',
    headline: `'${field}' 계열과 찰떡궁합`,
    score,
    subline: `내 전공·직업 적합도 ${score}%`,
  };
}

export interface FunCategory {
  id: string;
  label: string;
  emoji: string;
  getCard: (result: SajuResult) => FortuneCard;
}

export const FUN_CATEGORIES: FunCategory[] = [
  { id: 'wealth', label: '재물운', emoji: '💰', getCard: getWealthFortune },
  { id: 'love', label: '연애운', emoji: '💕', getCard: getLoveFortune },
  { id: 'study', label: '학업운', emoji: '📚', getCard: getStudyFortune },
  { id: 'peak', label: '인생 황금기', emoji: '🌅', getCard: getPeakFortune },
  { id: 'tarot', label: '오늘의 타로', emoji: '🔮', getCard: getTarotFortune },
  { id: 'luckcolor', label: '행운의 색', emoji: '🎨', getCard: getLuckColorFortune },
  { id: 'awesome', label: '개쩌는 지수', emoji: '🔥', getCard: getAwesomeFortune },
  { id: 'fit', label: '적성 매칭', emoji: '🎯', getCard: getFitFortune },
  { id: 'job', label: '회사 존버 지수', emoji: '🏢', getCard: getJobEnduranceFortune },
  { id: 'lotto', label: '로또 확률', emoji: '🎰', getCard: getLottoFortune },
];

// ---------- 궁합 ----------

const GEN_ORDER: (keyof WuxingCount)[] = ['wood', 'fire', 'earth', 'metal', 'water'];
const OVERCOME_MAP: Record<keyof WuxingCount, keyof WuxingCount> = {
  wood: 'earth',
  earth: 'water',
  water: 'fire',
  fire: 'metal',
  metal: 'wood',
};

type Relation = 'same' | 'generates' | 'generatedBy' | 'overcomes' | 'overcomeBy' | 'neutral';

function relationOf(a: keyof WuxingCount, b: keyof WuxingCount): Relation {
  if (a === b) return 'same';
  const idx = GEN_ORDER.indexOf(a);
  if (GEN_ORDER[(idx + 1) % 5] === b) return 'generates';
  if (GEN_ORDER[(idx + 4) % 5] === b) return 'generatedBy';
  if (OVERCOME_MAP[a] === b) return 'overcomes';
  if (OVERCOME_MAP[b] === a) return 'overcomeBy';
  return 'neutral';
}

const RELATION_TEXT: Record<Relation, { range: [number, number]; comment: string }> = {
  same: { range: [70, 92], comment: '취향이 척척 맞는 편안한 케미' },
  generates: { range: [82, 99], comment: '내가 주는 게 많은 헌신형 사랑꾼 조합' },
  generatedBy: { range: [82, 99], comment: '받는 게 많아서 편안한 관계' },
  overcomes: { range: [40, 68], comment: '티격태격하지만 은근 자극적인 케미' },
  overcomeBy: { range: [40, 68], comment: '끌려다니는 느낌, 그래도 짜릿한 케미' },
  neutral: { range: [55, 78], comment: '무난하게 흘러가는 편안한 케미' },
};

// 서로 부족한 오행을 채워주는지 (0이었던 기운을 상대가 많이 가졌으면 보너스)
function complementBonus(mine: WuxingCount, partner: WuxingCount): number {
  const keys = Object.keys(mine) as (keyof WuxingCount)[];
  let bonus = 0;
  for (const k of keys) {
    if (mine[k] === 0 && partner[k] >= 2) bonus += 4;
    if (partner[k] === 0 && mine[k] >= 2) bonus += 4;
  }
  return Math.min(bonus, 12);
}

export function getCompatibility(
  myElement: keyof WuxingCount,
  partnerElement: keyof WuxingCount,
  seedKey: string,
  myCount?: WuxingCount,
  partnerCount?: WuxingCount,
): FortuneCard {
  const rel = relationOf(myElement, partnerElement);
  const { range, comment } = RELATION_TEXT[rel];
  const rng = seededRandom(seedKey);
  let score = randRange(rng, range[0], range[1]);

  let extra = '';
  if (myCount && partnerCount) {
    const bonus = complementBonus(myCount, partnerCount);
    if (bonus > 0) {
      score = Math.min(99, score + bonus);
      extra = ' · 서로 부족한 기운을 채워주는 사이!';
    }
  }
  return { emoji: '💞', headline: `궁합 지수 ${score}%`, score, subline: comment + extra };
}
