import { FormEvent, useState } from "react";

const iryokuTable: number[][] = [
  [0, 0, 0, 1, 2, 2, 3, 3, 4, 4],
  [0, 0, 0, 1, 2, 3, 3, 3, 4, 4],
  [0, 0, 0, 1, 2, 3, 4, 4, 4, 4],
  [0, 0, 1, 1, 2, 3, 4, 4, 4, 5],
  [0, 0, 1, 2, 2, 3, 4, 4, 5, 5],
  [0, 1, 1, 2, 2, 3, 4, 5, 5, 5],
  [0, 1, 1, 2, 3, 3, 4, 5, 5, 5],
  [0, 1, 1, 2, 3, 4, 4, 5, 5, 6],
  [0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
  [0, 1, 2, 3, 3, 4, 4, 5, 6, 7],
  [1, 1, 2, 3, 3, 4, 5, 5, 6, 7],
  [1, 2, 2, 3, 3, 4, 5, 6, 6, 7],
  [1, 2, 2, 3, 4, 4, 5, 6, 6, 7],
  [1, 2, 3, 3, 4, 4, 5, 6, 7, 7],
  [1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 4, 5, 5, 6, 7, 8],
  [1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
  [1, 2, 3, 4, 5, 5, 6, 7, 7, 8],
  [1, 2, 3, 4, 5, 6, 6, 7, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  [1, 2, 3, 4, 6, 6, 7, 8, 9, 10],
  [1, 2, 3, 5, 6, 6, 7, 8, 9, 10],
  [2, 2, 3, 5, 6, 7, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 7, 8, 9, 10],
  [2, 3, 4, 5, 6, 7, 8, 8, 9, 10],
  [2, 3, 4, 5, 6, 8, 8, 9, 9, 10],
  [2, 3, 4, 6, 6, 8, 8, 9, 9, 10],
  [2, 3, 4, 6, 6, 8, 9, 9, 10, 10],
  [2, 3, 4, 6, 7, 8, 9, 9, 10, 10],
  [2, 4, 4, 6, 7, 8, 9, 10, 10, 10],
  [2, 4, 5, 6, 7, 8, 9, 10, 10, 11],
  [3, 4, 5, 6, 7, 8, 10, 10, 10, 11],
  [3, 4, 5, 6, 8, 8, 10, 10, 10, 11],
  [3, 4, 5, 6, 8, 9, 10, 10, 11, 11],
  [3, 4, 5, 7, 8, 9, 10, 10, 11, 12],
  [3, 5, 5, 7, 8, 9, 10, 11, 11, 12],
  [3, 5, 6, 7, 8, 9, 10, 11, 12, 12],
  [3, 5, 6, 7, 8, 10, 10, 11, 12, 13],
  [4, 5, 6, 7, 8, 10, 11, 11, 12, 13],
  [4, 5, 6, 7, 9, 10, 11, 11, 12, 13],
  [4, 6, 6, 7, 9, 10, 11, 12, 12, 13],
  [4, 6, 7, 7, 9, 10, 11, 12, 13, 13],
  [4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [4, 6, 7, 8, 10, 10, 11, 12, 13, 14],
  [4, 6, 7, 9, 10, 10, 11, 12, 13, 14],
  [4, 6, 7, 9, 10, 10, 12, 13, 13, 14],
  [4, 6, 7, 9, 10, 11, 12, 13, 13, 15],
  [4, 6, 7, 9, 10, 12, 12, 13, 13, 15],
  [4, 6, 7, 10, 10, 12, 12, 13, 14, 15],
  [4, 6, 8, 10, 10, 12, 12, 13, 15, 15],
  [5, 7, 8, 10, 10, 12, 12, 13, 15, 15],
  [5, 7, 8, 10, 11, 12, 12, 13, 15, 15],
  [5, 7, 9, 10, 11, 12, 12, 14, 15, 15],
  [5, 7, 9, 10, 11, 12, 13, 14, 15, 16],
  [5, 7, 10, 10, 11, 12, 13, 14, 16, 16],
  [5, 8, 10, 10, 11, 12, 13, 15, 16, 16],
  [5, 8, 10, 11, 11, 12, 13, 15, 16, 17],
  [5, 8, 10, 11, 12, 12, 13, 15, 16, 17],
  [5, 9, 10, 11, 12, 12, 14, 15, 16, 17],
  [5, 9, 10, 11, 12, 13, 14, 15, 16, 18],
  [5, 9, 10, 11, 12, 13, 14, 16, 17, 18],
  [5, 9, 10, 11, 13, 13, 14, 16, 17, 18],
  [5, 9, 10, 11, 13, 13, 15, 17, 17, 18],
  [5, 9, 10, 11, 13, 14, 15, 17, 17, 18],
  [5, 9, 10, 12, 13, 14, 15, 17, 18, 18],
  [5, 9, 10, 12, 13, 15, 15, 17, 18, 19],
  [5, 9, 10, 12, 13, 15, 16, 17, 19, 19],
  [5, 9, 10, 12, 14, 15, 16, 17, 19, 19],
  [5, 9, 10, 12, 14, 16, 16, 17, 19, 19],
  [5, 9, 10, 12, 14, 16, 17, 18, 19, 19],
  [5, 9, 10, 13, 14, 16, 17, 18, 19, 20],
  [5, 9, 10, 13, 15, 16, 17, 18, 19, 20],
  [5, 9, 10, 13, 15, 16, 17, 19, 20, 21],
  [6, 9, 10, 13, 15, 16, 18, 19, 20, 21],
  [6, 9, 10, 13, 16, 16, 18, 19, 20, 21],
  [6, 9, 10, 13, 16, 17, 18, 19, 20, 21],
  [6, 9, 10, 13, 16, 17, 18, 20, 21, 22],
  [6, 9, 10, 13, 16, 17, 19, 20, 22, 23],
  [6, 9, 10, 13, 16, 18, 19, 20, 22, 23],
  [6, 9, 10, 13, 16, 18, 20, 21, 22, 23],
  [6, 9, 10, 13, 17, 18, 20, 21, 22, 23],
  [6, 9, 10, 14, 17, 18, 20, 21, 22, 24],
  [6, 9, 11, 14, 17, 18, 20, 21, 23, 24],
  [6, 9, 11, 14, 17, 19, 20, 21, 23, 24],
  [6, 9, 11, 14, 17, 19, 21, 22, 23, 24],
  [7, 10, 11, 14, 17, 19, 21, 22, 23, 25],
  [7, 10, 12, 14, 17, 19, 21, 22, 24, 25],
  [7, 10, 12, 14, 18, 19, 21, 22, 24, 25],
  [7, 10, 12, 15, 18, 19, 21, 22, 24, 26],
  [7, 10, 12, 15, 18, 19, 21, 23, 25, 26],
  [7, 11, 13, 15, 18, 19, 21, 23, 25, 26],
  [7, 11, 13, 15, 18, 20, 21, 23, 25, 27],
  [8, 11, 13, 15, 18, 20, 22, 23, 25, 27],
  [8, 11, 13, 16, 18, 20, 22, 23, 25, 28],
  [8, 11, 14, 16, 18, 20, 22, 23, 26, 28],
  [8, 11, 14, 16, 19, 20, 22, 24, 26, 28],
  [8, 12, 14, 16, 19, 20, 22, 24, 26, 28],
  [8, 12, 15, 16, 19, 20, 22, 24, 27, 28],
  [8, 12, 15, 17, 19, 20, 22, 24, 27, 29],
  [8, 12, 15, 18, 19, 20, 22, 24, 27, 30],
];

const MAX_IRYOK = iryokuTable.length - 1;
const MIN_CRITICAL = 2;
const MAX_CRITICAL = 12;
const MAX_CHAIN_DEPTH = 20;

function clampIryok(value: number): number {
  return Math.max(0, Math.min(Math.floor(value), MAX_IRYOK));
}

function clampCritical(value: number): number {
  return Math.max(MIN_CRITICAL, Math.min(Math.floor(value), MAX_CRITICAL));
}

function calcIryokuDamage(iryok: number, critical: number, depth = 0): number {
  if (depth >= MAX_CHAIN_DEPTH) {
    return 0;
  }

  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const dice = dice1 + dice2;

  if (dice === 2) {
    return 0;
  }

  let damage = iryokuTable[iryok][dice - 2] ?? 0;
  if (dice >= critical) {
    damage += calcIryokuDamage(iryok, critical, depth + 1);
  }
  return damage;
}

function calcDamage(iryok: number, critical: number, bonus: number): number {
  const clampedIryok = clampIryok(iryok);
  const clampedCritical = clampCritical(critical);
  const clampedBonus = Number.isFinite(bonus) ? Math.floor(bonus) : 0;
  return calcIryokuDamage(clampedIryok, clampedCritical) + clampedBonus;
}

export function TestDamage() {
  const [result, setResult] = useState<string | number>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const iryok = Number((form.elements.namedItem("userI") as HTMLInputElement).value);
    const critical = Number((form.elements.namedItem("userC") as HTMLInputElement).value);
    const bonus = Number((form.elements.namedItem("userD") as HTMLInputElement).value);
    setResult(calcDamage(iryok, critical, bonus));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-grouped is-grouped-multiline">
        <div className="control">
          <label className="label" htmlFor="userI">
            威力
          </label>
          <input
            id="userI"
            type="number"
            name="userI"
            placeholder="威力"
            min={0}
            max={MAX_IRYOK}
          />
        </div>
        <div className="control">
          <label className="label" htmlFor="userC">
            クリティカル値
          </label>
          <input
            id="userC"
            type="number"
            name="userC"
            placeholder="クリティカル値"
            min={MIN_CRITICAL}
            max={MAX_CRITICAL}
          />
        </div>
        <div className="control">
          <label className="label" htmlFor="userD">
            追加ダメージ
          </label>
          <input id="userD" type="number" name="userD" placeholder="追加dダメージ" />
        </div>
        <div className="control">
          <label className="label" aria-hidden="true">
            &nbsp;
          </label>
          <button type="submit" className="button is-dark">
            計算
          </button>
        </div>
      </div>
      <p aria-live="polite">{result}</p>
    </form>
  );
}
