import type { SajuResult } from '../lib/saju';

export default function SinsalPanel({ result }: { result: SajuResult }) {
  const list = result.sinsalList;

  return (
    <div className="card-section">
      <h3>🔮 내 사주에 있는 특별한 기운 (신살)</h3>
      <p className="lead-text">
        도화살·역마살처럼 사람들이 제일 궁금해하는 "무슨 살"이에요. 하나만으로 운명이 정해지는 건 아니고, 내 기질을 이해하는 힌트예요.
      </p>

      {list.length === 0 ? (
        <p className="note">뚜렷하게 잡히는 신살이 없는 깔끔한 사주네요. (태어난 시간을 넣으면 더 정확해요!)</p>
      ) : (
        <div className="sinsal-list">
          {list.map((s) => (
            <div className={`sinsal-card ${s.good ? 'good' : 'caution'}`} key={s.name}>
              <div className="sinsal-head">
                <span className="sinsal-emoji">{s.emoji}</span>
                <span className="sinsal-name">{s.name}</span>
                <span className={`sinsal-badge ${s.good ? 'good' : 'caution'}`}>
                  {s.good ? '길신 ✨' : '주의 ⚠️'}
                </span>
                <span className="sinsal-where">{s.where}</span>
              </div>
              <div className="sinsal-oneline">{s.oneLine}</div>
              <p className="sinsal-meaning">{s.meaning}</p>
              <p className="sinsal-basis">💡 왜? {s.basis}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
