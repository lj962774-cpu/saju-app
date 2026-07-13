import { useState } from 'react';
import type { SajuResult, WuxingCount } from '../lib/saju';
import { calculateSaju } from '../lib/saju';
import { getCompatibility, type FortuneCard } from '../data/funContent';

const HANJA_TO_KEY: Record<string, keyof WuxingCount> = {
  '木': 'wood', '火': 'fire', '土': 'earth', '金': 'metal', '水': 'water',
};

export default function CompatibilityCard({ result }: { result: SajuResult }) {
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [timeUnknown, setTimeUnknown] = useState(true);
  const [card, setCard] = useState<FortuneCard | null>(null);

  const handleCheck = () => {
    const myElement = HANJA_TO_KEY[result.dayPillar.wuxingGanHanja];
    const partner = calculateSaju(year, month, day, timeUnknown ? 12 : hour, 0, 'male', timeUnknown);
    const partnerElement = HANJA_TO_KEY[partner.dayPillar.wuxingGanHanja];
    const seedKey = `${result.solarDate}-${year}-${month}-${day}-${timeUnknown ? 'x' : hour}`;
    setCard(getCompatibility(myElement, partnerElement, seedKey, result.wuxingCount, partner.wuxingCount));
  };

  return (
    <div className="card-section">
      <h3>💞 우리 둘의 케미는?</h3>
      <p className="lead-text">상대방 생년월일(양력)만 넣으면 바로 확인! 시간은 몰라도 괜찮아요.</p>
      <div className="form-inline">
        <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        <span>년</span>
        <input type="number" min={1} max={12} value={month} onChange={(e) => setMonth(Number(e.target.value))} />
        <span>월</span>
        <input type="number" min={1} max={31} value={day} onChange={(e) => setDay(Number(e.target.value))} />
        <span>일</span>
      </div>
      <div className="form-inline" style={{ marginTop: 8 }}>
        <input
          type="number"
          min={0}
          max={23}
          value={hour}
          disabled={timeUnknown}
          onChange={(e) => setHour(Number(e.target.value))}
        />
        <span>시</span>
        <label className="checkbox-label">
          <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} />
          시간 모름
        </label>
      </div>
      <button type="button" className="submit-btn small-btn" onClick={handleCheck}>
        궁합 보기
      </button>
      {card && (
        <div className="fun-result-card" style={{ marginTop: 14 }}>
          <div className="fun-result-emoji">{card.emoji}</div>
          <div className="fun-result-headline">{card.headline}</div>
          {typeof card.score === 'number' && (
            <div className="fun-score-track">
              <div className="fun-score-fill" style={{ width: `${card.score}%` }} />
            </div>
          )}
          <div className="fun-result-subline">{card.subline}</div>
        </div>
      )}
    </div>
  );
}
