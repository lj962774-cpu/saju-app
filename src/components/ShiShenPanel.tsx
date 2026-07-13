import type { PillarInfo, SajuResult } from '../lib/saju';
import { SHISHEN_DESC } from '../data/content';

function collectShiShen(result: SajuResult): string[] {
  const pillars = [
    result.yearPillar,
    result.monthPillar,
    result.dayPillar,
    ...(result.timePillar ? [result.timePillar] : []),
  ];
  const list: string[] = [];
  for (const p of pillars) {
    if (p.shiShenGan !== '일간(본인)') list.push(p.shiShenGan);
    list.push(...p.shiShenZhi);
  }
  return list;
}

export default function ShiShenPanel({ result }: { result: SajuResult }) {
  const pillars = [
    result.yearPillar,
    result.monthPillar,
    result.dayPillar,
    ...(result.timePillar ? [result.timePillar] : []),
  ] as PillarInfo[];

  const counts = new Map<string, number>();
  for (const s of collectShiShen(result)) {
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name)
    .filter((name) => SHISHEN_DESC[name]);

  return (
    <div className="card-section">
      <h3>🎭 나에게 강한 기운, 십신(十神)</h3>
      <p className="lead-text">사주 여덟 글자 중 이런 성향이 특히 도드라져요.</p>
      <div className="shishen-tags">
        {top.map((name) => {
          const desc = SHISHEN_DESC[name];
          return (
            <div className="shishen-tag-card" key={name}>
              <div className="shishen-tag-emoji">{desc.emoji}</div>
              <div>
                <div className="shishen-tag-name">{name}</div>
                <div className="shishen-tag-keyword">{desc.keyword}</div>
                <div className="shishen-tag-desc">{desc.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
      <details className="detail-toggle">
        <summary>기둥별 십신 원본표 보기</summary>
        <table className="shishen-table">
          <thead>
            <tr>
              <th>기둥</th>
              <th>천간 십신</th>
              <th>지지 속 십신</th>
            </tr>
          </thead>
          <tbody>
            {pillars.map((p) => (
              <tr key={p.label}>
                <td>{p.label}</td>
                <td>{p.shiShenGan}</td>
                <td>{p.shiShenZhi.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="shishen-desc-list">
          {Object.entries(SHISHEN_DESC).map(([name, desc]) => (
            <p key={name} className="shishen-desc-item">
              {desc.emoji} <strong>{name}</strong> ({desc.keyword}) — {desc.desc}
            </p>
          ))}
        </div>
      </details>
    </div>
  );
}
