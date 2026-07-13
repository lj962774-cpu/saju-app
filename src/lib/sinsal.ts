// 신살(神煞) 계산 - 사주에서 사람들이 가장 궁금해하는 특수 기운
// 전통 명리학에서 통용되는 계산 규칙을 쉬운 말로 정리했습니다.

export interface SinsalInfo {
  name: string;
  emoji: string;
  oneLine: string; // 한 줄 요약
  meaning: string; // 쉬운 설명
  basis: string; // 왜 생기는지 (근거)
  good: boolean; // 길신(좋은 기운)이면 true
}

export interface SinsalHit extends SinsalInfo {
  where: string; // 어느 기둥에서 걸렸는지
}

// 삼합 그룹별 도화/역마/화개 지지
// key: 기준 지지(년지 또는 일지), value: [도화, 역마, 화개]
const SAMHAP: Record<string, { dohwa: string; yeokma: string; hwagae: string }> = {
  '寅': { dohwa: '卯', yeokma: '申', hwagae: '戌' },
  '午': { dohwa: '卯', yeokma: '申', hwagae: '戌' },
  '戌': { dohwa: '卯', yeokma: '申', hwagae: '戌' },
  '申': { dohwa: '酉', yeokma: '寅', hwagae: '辰' },
  '子': { dohwa: '酉', yeokma: '寅', hwagae: '辰' },
  '辰': { dohwa: '酉', yeokma: '寅', hwagae: '辰' },
  '巳': { dohwa: '午', yeokma: '亥', hwagae: '丑' },
  '酉': { dohwa: '午', yeokma: '亥', hwagae: '丑' },
  '丑': { dohwa: '午', yeokma: '亥', hwagae: '丑' },
  '亥': { dohwa: '子', yeokma: '巳', hwagae: '未' },
  '卯': { dohwa: '子', yeokma: '巳', hwagae: '未' },
  '未': { dohwa: '子', yeokma: '巳', hwagae: '未' },
};

// 일간 기준 천을귀인 지지
const CHEONEUL: Record<string, string[]> = {
  '甲': ['丑', '未'], '戊': ['丑', '未'], '庚': ['丑', '未'],
  '乙': ['子', '申'], '己': ['子', '申'],
  '丙': ['亥', '酉'], '丁': ['亥', '酉'],
  '辛': ['寅', '午'],
  '壬': ['卯', '巳'], '癸': ['卯', '巳'],
};

// 일간 기준 문창귀인 지지
const MUNCHANG: Record<string, string> = {
  '甲': '巳', '乙': '午', '丙': '申', '丁': '酉', '戊': '申',
  '己': '酉', '庚': '亥', '辛': '子', '壬': '寅', '癸': '卯',
};

// 일간 기준 양인살 지지 (양간 위주)
const YANGIN: Record<string, string> = {
  '甲': '卯', '丙': '午', '戊': '午', '庚': '酉', '壬': '子',
};

// 일간 기준 홍염살 지지
const HONGYEOM: Record<string, string> = {
  '甲': '午', '乙': '午', '丙': '寅', '丁': '未', '戊': '辰',
  '己': '辰', '庚': '戌', '辛': '酉', '壬': '子', '癸': '申',
};

// 백호대살 간지 (60갑자 중 특정 조합)
const BAEKHO = new Set(['甲辰', '乙未', '丙戌', '丁丑', '戊辰', '壬戌', '癸丑']);

const INFO: Record<string, SinsalInfo> = {
  도화살: {
    name: '도화살',
    emoji: '🌸',
    oneLine: '가만있어도 끌리는 매력',
    meaning: '이성에게 인기가 많고 사람을 끌어당기는 매력이 있어요. 연예인·인플루언서 사주에 흔해요.',
    basis: '삼합의 "목욕(沐浴)" 자리에 해당하는 지지가 사주에 있을 때 생겨요. 꽃이 핀다는 뜻이에요.',
    good: true,
  },
  역마살: {
    name: '역마살',
    emoji: '✈️',
    oneLine: '한곳에 못 있는 이동왕',
    meaning: '이사·이직·해외·여행처럼 움직일 때 오히려 운이 풀려요. 가만히 있으면 답답한 타입.',
    basis: '삼합을 정면으로 치는(충) 지지가 있을 때 생겨요. 옛날 말(馬)을 갈아타던 역참에서 온 말이에요.',
    good: true,
  },
  화개살: {
    name: '화개살',
    emoji: '🎨',
    oneLine: '혼자만의 세계가 있는 예술가',
    meaning: '학문·예술·종교처럼 깊이 파고드는 기질. 혼자 있는 시간에 창의력이 폭발해요.',
    basis: '삼합이 마무리되는 "고(庫)" 자리 지지가 있을 때 생겨요. 화려한 것을 덮는다는 뜻이에요.',
    good: true,
  },
  천을귀인: {
    name: '천을귀인',
    emoji: '🍀',
    oneLine: '위기마다 도와주는 귀인',
    meaning: '어려울 때 도와주는 사람이 꼭 나타나는 최고의 길신. 사주에 있으면 복이 많다고 봐요.',
    basis: '태어난 날의 천간(일간)과 짝을 이루는 특정 지지가 있을 때 생기는 대표적인 좋은 기운이에요.',
    good: true,
  },
  문창귀인: {
    name: '문창귀인',
    emoji: '📖',
    oneLine: '공부·시험에 강한 머리',
    meaning: '학업·시험·글쓰기에 재능이 있어요. 공부머리와 표현력이 좋은 길신.',
    basis: '일간이 "생기를 뿜어내는" 지지에 해당할 때 생겨요. 문(文)이 번창한다는 뜻이에요.',
    good: true,
  },
  양인살: {
    name: '양인살',
    emoji: '⚔️',
    oneLine: '강한 카리스마, 센 기운',
    meaning: '기가 세고 추진력이 강해요. 잘 쓰면 카리스마·전문성, 과하면 욱하는 성격으로 나와요.',
    basis: '일간의 기운이 가장 강해지는 지지에 해당할 때 생겨요. 칼날(刃)처럼 날카롭다는 뜻이에요.',
    good: false,
  },
  홍염살: {
    name: '홍염살',
    emoji: '💋',
    oneLine: '은근한 섹시함·끼',
    meaning: '도화살과 비슷하지만 더 은은하고 세련된 매력. 분위기 있는 사람으로 보여요.',
    basis: '일간과 특정 지지가 만날 때 생겨요. 붉고 고운 빛(紅艶)이라는 뜻이에요.',
    good: true,
  },
  백호살: {
    name: '백호살',
    emoji: '🐯',
    oneLine: '겉은 강하고 속은 여린 외유내강',
    meaning: '옛날엔 무서운 흉살로 봤지만, 요즘엔 험한 세상 헤쳐나가는 강한 힘으로 해석해요. 겉은 세도 속은 부드러운 타입.',
    basis: '60갑자 중 특정 간지 조합(예: 갑진·을미 등)이 사주에 있을 때 생겨요. 흰 호랑이라는 뜻이에요.',
    good: false,
  },
};

interface Pillar {
  label: string;
  gan: string;
  zhi: string;
  ganZhi: string;
}

export function findSinsal(
  dayGan: string,
  yearZhi: string,
  pillars: Pillar[],
): SinsalHit[] {
  const hits: SinsalHit[] = [];
  const seen = new Set<string>();

  const add = (info: SinsalInfo, where: string) => {
    if (seen.has(info.name)) return;
    seen.add(info.name);
    hits.push({ ...info, where });
  };

  // 도화/역마/화개 (년지·일지 기준으로 다른 지지를 체크)
  const dayZhi = pillars.find((p) => p.label === '일주')?.zhi ?? '';
  const bases = [yearZhi, dayZhi].filter(Boolean);
  for (const base of bases) {
    const s = SAMHAP[base];
    if (!s) continue;
    for (const p of pillars) {
      if (p.zhi === s.dohwa) add(INFO.도화살, `${p.label}`);
      if (p.zhi === s.yeokma) add(INFO.역마살, `${p.label}`);
      if (p.zhi === s.hwagae) add(INFO.화개살, `${p.label}`);
    }
  }

  // 일간 기준 신살들
  for (const p of pillars) {
    if (CHEONEUL[dayGan]?.includes(p.zhi)) add(INFO.천을귀인, p.label);
    if (MUNCHANG[dayGan] === p.zhi) add(INFO.문창귀인, p.label);
    if (YANGIN[dayGan] === p.zhi) add(INFO.양인살, p.label);
    if (HONGYEOM[dayGan] === p.zhi) add(INFO.홍염살, p.label);
    if (BAEKHO.has(p.ganZhi)) add(INFO.백호살, p.label);
  }

  return hits;
}
