// @ts-expect-error - lunar-javascript has no type definitions
import { Solar } from 'lunar-javascript';
import {
  ganKr,
  zhiKr,
  wuxingCharsKr,
  shiShenKr,
  ZHI_ANIMAL_KR,
  ZHI_ANIMAL_EMOJI,
  wuxingOfGanZhiKr,
  ganWuxingHanja,
  computeShiShenKr,
} from './hanja';
import { findSinsal, type SinsalHit } from './sinsal';
import { DAYUN_THEME } from '../data/content';

export type Gender = 'male' | 'female';

export interface PillarInfo {
  label: string; // 년주/월주/일주/시주
  ganHanja: string;
  zhiHanja: string;
  ganKr: string;
  zhiKr: string;
  wuxingGanHanja: string;
  wuxingZhiHanja: string;
  wuxingGanKr: string;
  wuxingZhiKr: string;
  shiShenGan: string; // 한글
  shiShenZhi: string[]; // 한글 배열 (지장간 기준 십신)
  hideGanHanja: string[];
}

export interface DaYunInfo {
  startAge: number;
  endAge: number;
  startYear: number;
  ganZhiHanja: string;
  ganZhiKr: string;
  wuxingKr: string;
  shiShen: string; // 대운 천간의 십신
  themeEmoji: string;
  themeTitle: string;
  themeDesc: string;
}

export interface WuxingCount {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface SajuResult {
  solarDate: string;
  lunarDate: string;
  animal: string;
  animalEmoji: string;
  yearPillar: PillarInfo;
  monthPillar: PillarInfo;
  dayPillar: PillarInfo;
  timePillar: PillarInfo | null;
  dayMasterGan: string; // 일간 한자
  dayMasterGanKr: string;
  wuxingCount: WuxingCount;
  daYunList: DaYunInfo[];
  daYunStartAge: number;
  sinsalList: SinsalHit[];
  timeUnknown: boolean;
}

const WUXING_KEY_MAP: Record<string, keyof WuxingCount> = {
  '木': 'wood',
  '火': 'fire',
  '土': 'earth',
  '金': 'metal',
  '水': 'water',
};

export function calculateSaju(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  gender: Gender,
  timeUnknown: boolean,
): SajuResult {
  const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();

  const buildPillar = (
    label: string,
    gan: string,
    zhi: string,
    wuxing: string,
    shiShenGan: string,
    shiShenZhi: string[],
    hideGan: string[],
  ): PillarInfo => ({
    label,
    ganHanja: gan,
    zhiHanja: zhi,
    ganKr: ganKr(gan),
    zhiKr: zhiKr(zhi),
    wuxingGanHanja: wuxing[0],
    wuxingZhiHanja: wuxing[1],
    wuxingGanKr: wuxingCharsKr(wuxing[0]),
    wuxingZhiKr: wuxingCharsKr(wuxing[1]),
    shiShenGan: shiShenKr(shiShenGan),
    shiShenZhi: shiShenZhi.map(shiShenKr),
    hideGanHanja: hideGan,
  });

  const yearPillar = buildPillar(
    '년주',
    ec.getYearGan(),
    ec.getYearZhi(),
    ec.getYearWuXing(),
    ec.getYearShiShenGan(),
    ec.getYearShiShenZhi(),
    ec.getYearHideGan(),
  );
  const monthPillar = buildPillar(
    '월주',
    ec.getMonthGan(),
    ec.getMonthZhi(),
    ec.getMonthWuXing(),
    ec.getMonthShiShenGan(),
    ec.getMonthShiShenZhi(),
    ec.getMonthHideGan(),
  );
  const dayPillar = buildPillar(
    '일주',
    ec.getDayGan(),
    ec.getDayZhi(),
    ec.getDayWuXing(),
    ec.getDayShiShenGan(),
    ec.getDayShiShenZhi(),
    ec.getDayHideGan(),
  );
  const timePillar = timeUnknown
    ? null
    : buildPillar(
        '시주',
        ec.getTimeGan(),
        ec.getTimeZhi(),
        ec.getTimeWuXing(),
        ec.getTimeShiShenGan(),
        ec.getTimeShiShenZhi(),
        ec.getTimeHideGan(),
      );

  // 오행 분포: 각 기둥의 천간 오행 + 지지 오행 (모름이면 시주는 제외)
  const wuxingCount: WuxingCount = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  const pillars = [yearPillar, monthPillar, dayPillar, ...(timePillar ? [timePillar] : [])];
  for (const p of pillars) {
    const ganKey = WUXING_KEY_MAP[p.wuxingGanHanja];
    const zhiKey = WUXING_KEY_MAP[p.wuxingZhiHanja];
    if (ganKey) wuxingCount[ganKey] += 1;
    if (zhiKey) wuxingCount[zhiKey] += 1;
  }

  const dayGan = ec.getDayGan();
  const genderCode = gender === 'male' ? 1 : 0;
  const yun = ec.getYun(genderCode);
  const rawDaYun = yun.getDaYun(9); // 첫 항목(index 0)은 태어난 시점부터 대운 시작 전까지
  const daYunList: DaYunInfo[] = rawDaYun
    .filter((d: any) => d.getIndex() >= 1)
    .map((d: any) => {
      const gz = d.getGanZhi();
      const shiShen = computeShiShenKr(dayGan, gz[0]);
      const theme = DAYUN_THEME[shiShen] ?? DAYUN_THEME['비견'];
      return {
        startAge: d.getStartAge(),
        endAge: d.getEndAge(),
        startYear: d.getStartYear(),
        ganZhiHanja: gz,
        ganZhiKr: `${ganKr(gz[0])}${zhiKr(gz[1])}`,
        wuxingKr: wuxingOfGanZhiKr(gz),
        shiShen,
        themeEmoji: theme.emoji,
        themeTitle: theme.title,
        themeDesc: theme.desc,
      };
    });

  // 신살 계산
  const sinsalPillars = [
    { label: '년주', gan: ec.getYearGan(), zhi: ec.getYearZhi(), ganZhi: ec.getYear() },
    { label: '월주', gan: ec.getMonthGan(), zhi: ec.getMonthZhi(), ganZhi: ec.getMonth() },
    { label: '일주', gan: ec.getDayGan(), zhi: ec.getDayZhi(), ganZhi: ec.getDay() },
    ...(timeUnknown
      ? []
      : [{ label: '시주', gan: ec.getTimeGan(), zhi: ec.getTimeZhi(), ganZhi: ec.getTime() }]),
  ];
  const sinsalList = findSinsal(dayGan, ec.getYearZhi(), sinsalPillars);

  return {
    solarDate: solar.toYmd(),
    lunarDate: `${lunar.getYear()}-${lunar.getMonth()}-${lunar.getDay()}`,
    animal: ZHI_ANIMAL_KR[ec.getYearZhi()] ?? '',
    animalEmoji: ZHI_ANIMAL_EMOJI[ec.getYearZhi()] ?? '🐾',
    yearPillar,
    monthPillar,
    dayPillar,
    timePillar,
    dayMasterGan: ec.getDayGan(),
    dayMasterGanKr: ganKr(ec.getDayGan()),
    wuxingCount,
    daYunList,
    daYunStartAge: yun.getStartYear(),
    sinsalList,
    timeUnknown,
  };
}

export function getDayMasterElement(year: number, month: number, day: number): keyof WuxingCount {
  const solar = Solar.fromYmdHms(year, month, day, 12, 0, 0);
  const ec = solar.getLunar().getEightChar();
  const hanja = ganWuxingHanja(ec.getDayGan());
  return WUXING_KEY_MAP[hanja];
}
