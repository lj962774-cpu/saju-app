import { useState } from 'react';
import type { SajuResult } from '../lib/saju';

const KR_WUXING_COLOR: Record<string, string> = {
  '목': '#3f9142', '화': '#d64545', '토': '#b8860b', '금': '#8a8a8a', '수': '#3a5fa8',
};

export default function DaYunTable({ result }: { result: SajuResult }) {
  const currentAge = new Date().getFullYear() - Number(result.solarDate.slice(0, 4)) + 1;
  const currentIdx = result.daYunList.findIndex(
    (d) => currentAge >= d.startAge && currentAge <= d.endAge,
  );
  const [selected, setSelected] = useState(currentIdx >= 0 ? currentIdx : 0);
  const active = result.daYunList[selected];

  return (
    <div className="card-section">
      <h3>⏳ 10년마다 바뀌는 내 운세 (대운)</h3>
      <p className="lead-text">
        약 {result.daYunStartAge}세부터 10년씩 인생의 큰 흐름이 바뀌어요. 칩을 눌러 그 시기를 자세히 보세요.
      </p>

      <div className="dayun-timeline">
        {result.daYunList.map((d, i) => {
          const wxFirst = d.wuxingKr.split(' ')[0];
          const color = KR_WUXING_COLOR[wxFirst] ?? '#8a4a2a';
          const isNow = i === currentIdx;
          return (
            <button
              type="button"
              className={`dayun-chip ${i === selected ? 'active' : ''}`}
              key={d.startAge}
              onClick={() => setSelected(i)}
            >
              {isNow && <div className="dayun-now">지금</div>}
              <div className="dayun-chip-age">{d.startAge}~{d.endAge}세</div>
              <div className="dayun-chip-emoji">{d.themeEmoji}</div>
              <div className="dayun-chip-ganzhi" style={{ color }}>{d.ganZhiKr}</div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="dayun-detail">
          <div className="dayun-detail-head">
            <span className="dayun-detail-emoji">{active.themeEmoji}</span>
            <div>
              <div className="dayun-detail-age">{active.startAge}세 ~ {active.endAge}세 ({active.startYear}년~)</div>
              <div className="dayun-detail-title">{active.themeTitle}</div>
            </div>
          </div>
          <p className="dayun-detail-desc">{active.themeDesc}</p>
          <div className="dayun-detail-tag">키워드 · {active.shiShen}</div>
        </div>
      )}
    </div>
  );
}
