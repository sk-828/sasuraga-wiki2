import { useCallback, useState } from "react";
import { Breadcrumb } from "../components";

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function drawCards(): [number, number] {
  const deck = shuffle(Array.from({ length: 22 }, (_, i) => i));
  return [deck[0], deck[1]];
}

function Card({ id }: { id: number }) {
  return (
    <div className="column is-6">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">カード {id}</p>
        </header>
        <div className="card-image">
          <img src={`images/tarot/${id}.jpg`} alt={`タロットカード ${id}`} loading="lazy" />
        </div>
        <div className="content">
          <p>ほんとうはここに解釈とか書きたいんですけどね。</p>
        </div>
      </div>
    </div>
  );
}

function Tarot() {
  const [cards, setCards] = useState<[number, number]>(() => drawCards());

  const redraw = useCallback(() => {
    setCards(drawCards());
  }, []);

  return (
    <>
      <p>アｍ・・・私は旅の占い師</p>
      <p>占いしていきませんか？</p>
      <div className="block">
        <button type="button" className="button is-warning" onClick={redraw}>
          もう一度引く
        </button>
      </div>
      <div className="tarot columns is-vcentered is-multiline">
        <Card id={cards[0]} />
        <Card id={cards[1]} />
      </div>
    </>
  );
}

export function TarotPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/tarot", content: "Tarot", active: true },
          ]}
        />
      </div>
      <Tarot />
    </>
  );
}
