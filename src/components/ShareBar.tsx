import { useState } from 'react';
import type { SajuResult } from '../lib/saju';
import { DAY_MASTER_DESC } from '../data/content';

export default function ShareBar({ result }: { result: SajuResult }) {
  const [copied, setCopied] = useState(false);

  const info = DAY_MASTER_DESC[result.dayMasterGanKr];
  const shareText = info
    ? `내 사주 캐릭터는 "${info.name} ${info.emoji} — ${info.tagline}"! 너도 해봐 👇`
    : '내 사주 캐릭터 확인해봐 👇';
  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: '나의 사주 캐릭터 찾기', text: shareText, url: shareUrl });
        return;
      } catch {
        // 사용자가 취소한 경우 등 -> 아래 복사로 폴백
      }
    }
    handleCopy();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="share-bar">
      <button type="button" className="share-btn primary" onClick={handleShare}>
        📤 결과 공유하기
      </button>
      <button type="button" className="share-btn" onClick={handleCopy}>
        {copied ? '✅ 복사됨!' : '🔗 링크 복사'}
      </button>
    </div>
  );
}
