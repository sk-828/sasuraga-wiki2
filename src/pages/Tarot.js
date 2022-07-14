import { useEffect, useState } from "react";
import React from 'react'
import { Breadcrumb, Loading } from "../components";

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Card(props) {
  return (
    <div className="column is-6">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title"></p>
        </header>
        <div className="card-image">
          <img src={`images/tarot/${props.id}.jpg`} alt="tarot" />
        </div>
        <div className="content">
          <p>ほんとうはここに解釈とか書きたいんですけどね。</p>
        </div>
      </div>
    </div>
  );
}

function Tarot() {
  const [array, setArray] = useState(null);
  useEffect(() => {
    var temp = [];
    for (var i = 0; i < 22; i++) {
      temp.push(i);
    }
    temp = shuffle(temp);
    setArray(temp);
  }, []);
  if (array === null) {
    return <Loading />;
  }
  return (
    <>
      <p>アｍ・・・私は旅の占い師</p>
      <p>占いしていきませんか？</p>
      <div className="tarot columns is-vcentered is-multiline">
        <Card id={array[0]}/>
        <Card id={array[7]}/>
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