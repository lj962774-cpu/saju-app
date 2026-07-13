import { useState } from 'react';
import type { Gender } from '../lib/saju';

export interface BirthFormValues {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: Gender;
  timeUnknown: boolean;
}

interface Props {
  onSubmit: (values: BirthFormValues) => void;
}

export default function BirthForm({ onSubmit }: Props) {
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [gender, setGender] = useState<Gender>('male');
  const [timeUnknown, setTimeUnknown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ year, month, day, hour, minute, gender, timeUnknown });
  };

  return (
    <form className="birth-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>생년월일 (양력)</label>
        <div className="form-inline">
          <input
            type="number"
            min={1900}
            max={2100}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <span>년</span>
          <input
            type="number"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
          <span>월</span>
          <input
            type="number"
            min={1}
            max={31}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <span>일</span>
        </div>
      </div>

      <div className="form-row">
        <label>태어난 시간</label>
        <div className="form-inline">
          <input
            type="number"
            min={0}
            max={23}
            value={hour}
            disabled={timeUnknown}
            onChange={(e) => setHour(Number(e.target.value))}
          />
          <span>시</span>
          <input
            type="number"
            min={0}
            max={59}
            value={minute}
            disabled={timeUnknown}
            onChange={(e) => setMinute(Number(e.target.value))}
          />
          <span>분</span>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={timeUnknown}
              onChange={(e) => setTimeUnknown(e.target.checked)}
            />
            시간 모름
          </label>
        </div>
      </div>

      <div className="form-row">
        <label>성별</label>
        <div className="form-inline">
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            남
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="gender"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            여
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        내 사주 보기
      </button>
    </form>
  );
}
