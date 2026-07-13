import { useState } from 'react';
import BirthForm, { type BirthFormValues } from './components/BirthForm';
import PillarsTable from './components/PillarsTable';
import WuxingChart from './components/WuxingChart';
import ShiShenPanel from './components/ShiShenPanel';
import DaYunTable from './components/DaYunTable';
import DayMasterCard from './components/DayMasterCard';
import FunFortuneDeck from './components/FunFortuneDeck';
import CompatibilityCard from './components/CompatibilityCard';
import SinsalPanel from './components/SinsalPanel';
import { calculateSaju, type SajuResult } from './lib/saju';
import './App.css';

function App() {
  const [result, setResult] = useState<SajuResult | null>(null);

  const handleSubmit = (values: BirthFormValues) => {
    const r = calculateSaju(
      values.year,
      values.month,
      values.day,
      values.timeUnknown ? 12 : values.hour,
      values.timeUnknown ? 0 : values.minute,
      values.gender,
      values.timeUnknown,
    );
    setResult(r);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>✨ 나의 사주 캐릭터 찾기</h1>
        <p>생년월일만 넣으면 캐릭터 카드부터 재미로 보는 운세까지 한번에!</p>
      </header>

      <BirthForm onSubmit={handleSubmit} />

      {result && (
        <div className="result-container">
          <DayMasterCard result={result} />
          <FunFortuneDeck result={result} />
          <SinsalPanel result={result} />
          <DaYunTable result={result} />
          <CompatibilityCard result={result} />
          <WuxingChart count={result.wuxingCount} />
          <ShiShenPanel result={result} />

          <details className="detail-toggle expert-toggle">
            <summary>🧾 정통 사주 원국표 보기 (전문가용)</summary>
            <PillarsTable result={result} />
          </details>
        </div>
      )}

      <footer className="app-footer">
        <p>본 결과는 재미·참고용 콘텐츠이며, 의학적·법적·재정적 조언을 대체하지 않습니다.</p>
      </footer>
    </div>
  );
}

export default App;
