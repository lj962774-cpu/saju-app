import type { PillarInfo, SajuResult } from '../lib/saju';
import { WUXING_COLOR } from '../lib/hanja';

function Cell({ pillar }: { pillar: PillarInfo }) {
  const ganColor = WUXING_COLOR[pillar.wuxingGanHanja] ?? '#333';
  const zhiColor = WUXING_COLOR[pillar.wuxingZhiHanja] ?? '#333';
  return (
    <td>
      <div className="pillar-cell">
        <div className="hanja-box" style={{ backgroundColor: ganColor }}>
          <span className="hanja">{pillar.ganHanja}</span>
          <span className="hangul">{pillar.ganKr}</span>
        </div>
        <div className="hanja-box" style={{ backgroundColor: zhiColor }}>
          <span className="hanja">{pillar.zhiHanja}</span>
          <span className="hangul">{pillar.zhiKr}</span>
        </div>
        <div className="shishen-tag">{pillar.shiShenGan}</div>
      </div>
    </td>
  );
}

export default function PillarsTable({ result }: { result: SajuResult }) {
  const pillars = [
    result.timePillar,
    result.dayPillar,
    result.monthPillar,
    result.yearPillar,
  ].filter(Boolean) as PillarInfo[];

  const labels = pillars.map((p) => p.label);

  return (
    <div className="pillars-section">
      <table className="pillars-table">
        <thead>
          <tr>
            {labels.map((l) => (
              <th key={l}>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {pillars.map((p) => (
              <Cell key={p.label} pillar={p} />
            ))}
          </tr>
        </tbody>
      </table>
      {result.timeUnknown && (
        <p className="note">※ 태어난 시간을 몰라 시주는 표시하지 않았습니다.</p>
      )}
      <p className="sub-info">
        음력 {result.lunarDate} · {result.animal}띠 · 일간(본인) {result.dayPillar.ganHanja}(
        {result.dayPillar.ganKr})
      </p>
    </div>
  );
}
