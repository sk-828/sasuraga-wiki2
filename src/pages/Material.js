import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";
import { fetchSeet } from "../api";


function Documents(props) {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  var temp = [];
  useEffect(() => {
    fetchSeet(props.ID).then((type) => {
      setData(type);
    });
  }, []);
  useEffect(() => {
    if (data == null) {
    } else {
      for (var i = 1; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  if (data == null) {
    return <Loading />
  }
  return (
    <>
      <br></br>
      <div className="columns is-vcentered is-multiline">
        未完成。ゆるして
        {array.map((i) => {
          return (<></>
          );
        })}

      </div></>
  );
}



function MaterialPageButton() {
  return (<div className="has-text-right">
    <Link className="button is-warning" to="/material">
      全体
    </Link>
    <Link className="button is-warning" to="/material1">
      ユフトゥン
    </Link>
    <Link className="button is-warning" to="/material2">
      黒上
    </Link>
    <Link className="button is-warning" to="/material3">
      もちたぬき
    </Link>
    <Link className="button is-warning" to="/material4">
      河辺文
    </Link>
    <Link className="button is-warning" to="/material5">
      聖人
    </Link>
    <Link className="button is-warning" to="/material6">
      ほらがい
    </Link>
  </div>);
}

export function MaterialPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集</h2>
      <Documents ID={0} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage1() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material1", content: "yuhu", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ユフトゥン</h2>
      <Documents ID={1} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage2() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material2", content: "kurokami", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　黒上</h2>
      <Documents ID={2} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage3() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material3", content: "mochi", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　もちたぬき</h2>
      <Documents ID={3} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage4() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material4", content: "kawabe", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　河辺文</h2>
      <Documents ID={4} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage5() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material5", content: "Saint", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　聖人</h2>
      <div className="box content">
        <h2>十三人の英雄</h2>
        200年前、蛮族に支配されていたカリブルヌスを取り戻した英雄。人間二人と、人間以外の種族が各一人づつから成る十三人組。蛮族討伐後も、国の復興に尽力した。
        <h2>コーンウォール村</h2>
        カリブルヌスの最南東部にある村。15年前の蛮族の襲撃によって家屋や畑は荒らされたが、竜騎士の活躍によって人的被害は少なかった。住民の多くは付近の町に移り住んだ。
        <h3>アヴァロンの王</h3>
        <p>カリブルヌスの南方に広がる蛮族の領域において、竜王アルビオンによって力を授けられた6人の支配者+アルビオンの総称。王の称号の事を冠位とも表し、１つの称号につき1人のみ就くことが出来るため王の座とも呼ばれる。王は先代を殺す事で継承を行う。そのため王が他の王を殺す事で2冠3冠になる事も出来るが、王同士の戦いはお互い大きな損傷をもたらすため忌みされ歴代通しても冠位複数持ちは少ない。</p>
        <h4>竜王アルビオン</h4>
        <p>アヴァロンの王の1人、300年前にケルディオン大陸に出現したドレイク。100年間カリブルヌスの地を支配していたが、200年前に英雄ウーゼルによって退治され南方へと逃げ、現在はその傷を癒している。</p>
        <p>手にした魔剣の名はアヴァロン。身に受けた傷を魔力に変換する力を持つ。</p>
        <p>彼女の白銀の炎は何であっても焼き尽くす、例え己の身であっても。</p>
        <h4>業王ヴォーティガーン</h4>
        <p>アヴァロンの王の1人、15年前に死んだがその際従えていた蛮族の統率を失った後カリブルヌスに攻め込む。カリブルヌスは大きな被害を負う。</p>
      </div>
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage6() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material1", content: "horagai", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ほらがい</h2>
      <Documents ID={6} />
      <MaterialPageButton />
    </>
  );
}
