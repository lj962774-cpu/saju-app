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

// 숫자 입력을 숫자로만 제한하고 앞자리 0 제거 + 최댓값 클램프.
// 타이핑 도중에는 빈 값을 허용하고, 최솟값 보정은 blur/제출 시점에 처리한다.
function sanitizeMax(raw: string, max: number): string {
  const digits = raw.replace(/\D/g, '');
  if (digits === '') return '';
  const n = Math.min(parseInt(digits, 10), max);
  return String(n);
}

function clampFull(raw: string, min: number, max: number): number {
  const digits = raw.replace(/\D/g, '');
  if (digits === '') return min;
  return Math.min(Math.max(parseInt(digits, 10), min), max);
}

export default function BirthForm({ onSubmit }: Props) {
  const [year, setYear] = useState('1995');
  const [month, setMonth] = useState('1');
  const [day, setDay] = useState('1');
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('0');
  const [gender, setGender] = useState<Gender>('male');
  const [timeUnknown, setTimeUnknown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      year: clampFull(year, 1900, 2100),
      month: clampFull(month, 1, 12),
      day: clampFull(day, 1, 31),
      hour: clampFull(hour, 0, 23),
      minute: clampFull(minute, 0, 59),
      gender,
      timeUnknown,
    });
  };

  return (
    <form className="birth-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>생년월일 (양력)</label>
        <div className="field-grid">
          <div className="num-field field-year">
            <input
              className="num-input"
              type="text"
              inputMode="numeric"
              aria-label="년"
              placeholder="1995"
              value={year}
              onChange={(e) => setYear(sanitizeMax(e.target.value, 2100))}
              onBlur={() => setYear(String(clampFull(year, 1900, 2100)))}
            />
            <span className="unit">년</span>
          </div>
          <div className="num-field">
            <input
              className="num-input"
              type="text"
              inputMode="numeric"
              aria-label="월"
              placeholder="1"
              value={month}
              onChange={(e) => setMonth(sanitizeMax(e.target.value, 12))}
              onBlur={() => setMonth(String(clampFull(month, 1, 12)))}
            />
            <span className="unit">월</span>
          </div>
          <div className="num-field">
            <input
              className="num-input"
              type="text"
              inputMode="numeric"
              aria-label="일"
              placeholder="1"
              value={day}
              onChange={(e) => setDay(sanitizeMax(e.target.value, 31))}
              onBlur={() => setDay(String(clampFull(day, 1, 31)))}
            />
            <span className="unit">일</span>
          </div>
        </div>
      </div>

      <div className="form-row">
        <label>태어난 시간</label>
        <div className="field-grid">
          <div className="num-field">
            <input
              className="num-input"
              type="text"
              inputMode="numeric"
              aria-label="시"
              placeholder="12"
              value={hour}
              disabled={timeUnknown}
              onChange={(e) => setHour(sanitizeMax(e.target.value, 23))}
              onBlur={() => setHour(String(clampFull(hour, 0, 23)))}
            />
            <span className="unit">시</span>
          </div>
          <div className="num-field">
            <input
              className="num-input"
              type="text"
              inputMode="numeric"
              aria-label="분"
              placeholder="0"
              value={minute}
              disabled={timeUnknown}
              onChange={(e) => setMinute(sanitizeMax(e.target.value, 59))}
              onBlur={() => setMinute(String(clampFull(minute, 0, 59)))}
            />
            <span className="unit">분</span>
          </div>
        </div>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={timeUnknown}
            onChange={(e) => setTimeUnknown(e.target.checked)}
          />
          시간 모름
        </label>
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
