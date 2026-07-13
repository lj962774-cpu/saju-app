import type { WuxingCount } from '../lib/saju';
import { WUXING_COLOR } from '../lib/hanja';
import { WUXING_DESC } from '../data/content';

const ORDER: { key: keyof WuxingCount; hanja: string; descKey: string }[] = [
  { key: 'wood', hanja: '木', descKey: 'wood' },
  { key: 'fire', hanja: '火', descKey: 'fire' },
  { key: 'earth', hanja: '土', descKey: 'earth' },
  { key: 'metal', hanja: '金', descKey: 'metal' },
  { key: 'water', hanja: '水', descKey: 'water' },
];

export default function WuxingChart({ count }: { count: WuxingCount }) {
  const max = Math.max(...Object.values(count), 1);
  const top = ORDER.reduce((a, b) => (count[b.key] > count[a.key] ? b : a));
  const zero = ORDER.filter((o) => count[o.key] === 0);
  const topDesc = WUXING_DESC[top.descKey];

  return (
    <div className="card-section">
      <h3>🌈 나의 오행 밸런스</h3>

      {/* 핵심 해석 카드 - "목 기운이 강하면 무슨 의미?" */}
      <div className="wuxing-verdict" style={{ borderColor: WUXING_COLOR[top.hanja] }}>
        <div className="wuxing-verdict-top">
          <span className="wuxing-verdict-emoji">{topDesc.emoji}</span>
          <span>
            나는 <strong style={{ color: WUXING_COLOR[top.hanja] }}>{topDesc.title} 기운</strong>이 제일 강한 사람!
          </span>
        </div>
        <p className="wuxing-verdict-strong">→ {topDesc.strong}</p>
        <p className="wuxing-verdict-why">💡 왜? {topDesc.why}</p>
        {zero.length > 0 && (
          <p className="wuxing-verdict-weak">
            부족한 기운: {zero.map((o) => WUXING_DESC[o.descKey].title).join(', ')} — {WUXING_DESC[zero[0].descKey].weak}
          </p>
        )}
      </div>

      <div className="wuxing-bars">
        {ORDER.map(({ key, hanja, descKey }) => {
          const value = count[key];
          const desc = WUXING_DESC[descKey];
          return (
            <div className="wuxing-bar-row" key={key}>
              <div className="wuxing-bar-label">
                <span className="wuxing-emoji">{desc.emoji}</span>
                <span style={{ color: WUXING_COLOR[hanja] }}>{desc.title}</span>
              </div>
              <div className="wuxing-bar-track">
                <div
                  className="wuxing-bar-fill"
                  style={{ width: `${(value / max) * 100}%`, backgroundColor: WUXING_COLOR[hanja] }}
                />
              </div>
              <div className="wuxing-bar-value">{value}</div>
            </div>
          );
        })}
      </div>

      <details className="detail-toggle">
        <summary>오행마다 무슨 뜻인지 하나씩 보기</summary>
        <div className="wuxing-desc-list">
          {ORDER.map(({ descKey }) => {
            const desc = WUXING_DESC[descKey];
            return (
              <div key={descKey} className="wuxing-desc-item">
                <p>
                  {desc.emoji} <strong>{desc.title}</strong> ({desc.keyword}) — {desc.desc}
                </p>
                <p className="wuxing-desc-why">💡 {desc.why}</p>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
