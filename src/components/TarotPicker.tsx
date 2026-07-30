import { useMemo, useState } from 'react';
import { TAROT_DECK, type TarotCard } from '../data/funContent';

const SPREAD_SIZE = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TarotPicker() {
  // 뽑을 때마다 덱을 섞어 앞면에 깔릴 카드를 새로 배치한다.
  const [drawKey, setDrawKey] = useState(0);
  const spread = useMemo<TarotCard[]>(
    () => shuffle(TAROT_DECK).slice(0, SPREAD_SIZE),
    // drawKey가 바뀔 때마다 재섞기
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [drawKey],
  );
  const [picked, setPicked] = useState<number | null>(null);

  const reshuffle = () => {
    setPicked(null);
    setDrawKey((k) => k + 1);
  };

  const chosen = picked !== null ? spread[picked] : null;

  return (
    <div className="tarot-picker">
      <p className="tarot-guide">
        {chosen ? '당신이 선택한 카드예요' : '마음이 가는 카드를 한 장 골라보세요'}
      </p>

      <div className="tarot-spread">
        {spread.map((card, i) => {
          const isPicked = picked === i;
          const faded = picked !== null && !isPicked;
          return (
            <button
              key={`${drawKey}-${i}`}
              type="button"
              className={`tarot-card ${isPicked ? 'revealed' : ''} ${faded ? 'faded' : ''}`}
              onClick={() => picked === null && setPicked(i)}
              disabled={picked !== null}
              aria-label={isPicked ? card.name : `카드 ${i + 1}`}
            >
              <span className="tarot-card-face">{isPicked ? card.emoji : '🔮'}</span>
            </button>
          );
        })}
      </div>

      {chosen && (
        <div className="tarot-result">
          <div className="tarot-result-name">{chosen.name}</div>
          <div className="tarot-result-meaning">{chosen.meaning}</div>
        </div>
      )}

      <button type="button" className="small-btn tarot-redraw" onClick={reshuffle}>
        {chosen ? '🔁 다시 뽑기' : '🔀 카드 섞기'}
      </button>
    </div>
  );
}
