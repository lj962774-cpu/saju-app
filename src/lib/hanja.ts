// 한자(干支/五行/十神) -> 한글 표기 변환 테이블

export const GAN_KR: Record<string, string> = {
  '甲': '갑', '乙': '을', '丙': '병', '丁': '정', '戊': '무',
  '己': '기', '庚': '경', '辛': '신', '壬': '임', '癸': '계',
};

export const ZHI_KR: Record<string, string> = {
  '子': '자', '丑': '축', '寅': '인', '卯': '묘', '辰': '진', '巳': '사',
  '午': '오', '未': '미', '申': '신', '酉': '유', '戌': '술', '亥': '해',
};

// 지지별 띠 동물
export const ZHI_ANIMAL_KR: Record<string, string> = {
  '子': '쥐', '丑': '소', '寅': '호랑이', '卯': '토끼', '辰': '용', '巳': '뱀',
  '午': '말', '未': '양', '申': '원숭이', '酉': '닭', '戌': '개', '亥': '돼지',
};

export const WUXING_KR: Record<string, string> = {
  '木': '목', '火': '화', '土': '토', '金': '금', '水': '수',
};

export const WUXING_COLOR: Record<string, string> = {
  '木': '#3f9142',
  '火': '#d64545',
  '土': '#b8860b',
  '金': '#8a8a8a',
  '水': '#3a5fa8',
};

export const SHISHEN_KR: Record<string, string> = {
  '比肩': '비견', '劫财': '겁재', '食神': '식신', '伤官': '상관',
  '偏财': '편재', '正财': '정재', '七杀': '편관(칠살)', '正官': '정관',
  '偏印': '편인', '正印': '정인', '日主': '일간(본인)',
};

export function ganKr(gan: string): string {
  return GAN_KR[gan] ?? gan;
}

export function zhiKr(zhi: string): string {
  return ZHI_KR[zhi] ?? zhi;
}

export function ganZhiKr(ganZhi: string): string {
  if (ganZhi.length < 2) return ganZhi;
  const gan = ganZhi[0];
  const zhi = ganZhi[1];
  return `${ganKr(gan)}${zhiKr(zhi)}`;
}

export function wuxingCharsKr(wuxing: string): string {
  return wuxing
    .split('')
    .map((c) => WUXING_KR[c] ?? c)
    .join(' ');
}

export function shiShenKr(shiShen: string): string {
  return SHISHEN_KR[shiShen] ?? shiShen;
}

const GAN_WUXING_HANJA: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
};

const ZHI_WUXING_HANJA: Record<string, string> = {
  '子': '水', '亥': '水', '寅': '木', '卯': '木', '巳': '火', '午': '火',
  '辰': '土', '戌': '土', '丑': '土', '未': '土', '申': '金', '酉': '金',
};

export function wuxingOfGanZhiKr(ganZhi: string): string {
  if (ganZhi.length < 2) return '';
  const ganW = GAN_WUXING_HANJA[ganZhi[0]];
  const zhiW = ZHI_WUXING_HANJA[ganZhi[1]];
  return `${WUXING_KR[ganW] ?? ''} ${WUXING_KR[zhiW] ?? ''}`;
}

export function ganWuxingHanja(gan: string): string {
  return GAN_WUXING_HANJA[gan];
}

export const ZHI_ANIMAL_EMOJI: Record<string, string> = {
  '子': '🐭', '丑': '🐮', '寅': '🐯', '卯': '🐰', '辰': '🐲', '巳': '🐍',
  '午': '🐴', '未': '🐑', '申': '🐵', '酉': '🐔', '戌': '🐶', '亥': '🐷',
};

// 천간 음양 (양: true)
const GAN_YANG: Record<string, boolean> = {
  '甲': true, '乙': false, '丙': true, '丁': false, '戊': true,
  '己': false, '庚': true, '辛': false, '壬': true, '癸': false,
};

const WUXING_ORDER = ['木', '火', '土', '金', '水'];

// dayGan(나) 기준으로 otherGan이 어떤 십신인지 (한글 반환)
export function computeShiShenKr(dayGan: string, otherGan: string): string {
  const me = GAN_WUXING_HANJA[dayGan];
  const other = GAN_WUXING_HANJA[otherGan];
  const samePolarity = GAN_YANG[dayGan] === GAN_YANG[otherGan];
  const mi = WUXING_ORDER.indexOf(me);
  const oi = WUXING_ORDER.indexOf(other);

  if (me === other) return samePolarity ? '비견' : '겁재';
  if ((mi + 1) % 5 === oi) return samePolarity ? '식신' : '상관'; // 내가 생하는 것
  if ((mi + 2) % 5 === oi) return samePolarity ? '편재' : '정재'; // 내가 극하는 것
  if ((mi + 3) % 5 === oi) return samePolarity ? '편관(칠살)' : '정관'; // 나를 극하는 것
  return samePolarity ? '편인' : '정인'; // 나를 생하는 것
}
