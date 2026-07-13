import type { SajuResult } from '../lib/saju';
import { DAY_MASTER_DESC } from '../data/content';
import { WUXING_COLOR } from '../lib/hanja';

export default function DayMasterCard({ result }: { result: SajuResult }) {
  const info = DAY_MASTER_DESC[result.dayMasterGanKr];
  if (!info) return null;
  const color = WUXING_COLOR[result.dayPillar.wuxingGanHanja] ?? '#8a4a2a';

  return (
    <div className="hero-card" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
      <div className="hero-emoji">{info.emoji}</div>
      <div className="hero-name">{info.name}</div>
      <div className="hero-tagline">{info.tagline}</div>
      <p className="hero-desc">{info.desc}</p>
      <div className="hero-badge">
        일간 {result.dayPillar.ganHanja}({result.dayMasterGanKr})
      </div>
    </div>
  );
}
