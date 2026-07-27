import { useState } from 'react';
import type { SajuResult } from '../lib/saju';
import { FUN_CATEGORIES } from '../data/funContent';

export default function FunFortuneDeck({ result }: { result: SajuResult }) {
  const [activeId, setActiveId] = useState(FUN_CATEGORIES[0].id);
  const active = FUN_CATEGORIES.find((c) => c.id === activeId) ?? FUN_CATEGORIES[0];
  const card = active.getCard(result);

  return (
    <div className="card-section">
      <h3>🎲 재미로 보는 운세</h3>
      <div className="fun-chip-row">
        {FUN_CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`fun-chip ${c.id === activeId ? 'active' : ''}`}
            onClick={() => setActiveId(c.id)}
            type="button"
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <div className="fun-result-card">
        <div className="fun-result-emoji">{card.emoji}</div>
        <div className="fun-result-headline">{card.headline}</div>
        {card.color && (
          <div className="fun-color-swatch" style={{ background: card.color }} />
        )}
        {typeof card.score === 'number' && (
          <div className="fun-score-track">
            <div className="fun-score-fill" style={{ width: `${card.score}%` }} />
          </div>
        )}
        <div className="fun-result-subline">{card.subline}</div>
      </div>
    </div>
  );
}
