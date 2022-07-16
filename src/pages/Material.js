import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb,Loading } from "../components";
import { fetchSeet } from "../api";

function MaterialCard(props) {
  const [stat, setStat] = useState(1);
  function open() {
    setStat(1);
  }
  function close() {
    setStat(0);
  }
  if (stat == 1) {
    return (
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title" onClick={close}>{props.data[props.ID][0]}</p>
          </header>
          <div className="content">
            {props.data[props.ID][2]}
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="column is-6">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title" onClick={open}>{props.data[props.ID][0]}</p>
          </header>
          <div className="content">
          </div>
        </div>
      </div>
    );
  }
}

function Gallery(props) {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  useEffect(() => {
    var temp = [];
    if (data == null) {
    } else {
      for (var i = 1; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  useEffect(() => {
    fetchSeet(10).then((type) => {
      setData(type);
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    console.log(breed.value);
    var temp = [];
    for (var i = 1; i < data.length; i++) {
      if (breed.value === "0") {
        temp.push(i);
      } else if(breed.value === data[i][1]) {
        temp.push(i);
      }
    }
    setArray(temp);
    console.log(array);
  }
  if (data == null) {
    return <Loading />
  }
  return (
    <>
      <br></br>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="0">
                  <option value="0">全体</option>
                  <option value="ユフトゥン">ユフトゥン</option>
                  <option value="黒上">黒上</option>
                  <option value="もちたぬき">もちたぬき</option>
                  <option value="河辺文">河辺文</option>
                  <option value="聖人">聖人</option>
                  <option value="ほらがい">ほらがい</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Set
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="columns is-vcentered is-multiline">
        {array.map((i) => {
          return (
            <MaterialCard data={data} ID={i} key={i} user={props.ID} />
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
            { href: "/material", content: "material" },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集</h2>
      <Gallery />
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
            { href: "/material", content: "material" },
            { href: "/material1", content: "yuhu", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ユフトゥン</h2>
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
            { href: "/material", content: "material" },
            { href: "/material2", content: "kurokami", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　黒上</h2>
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
            { href: "/material", content: "material" },
            { href: "/material3", content: "mochi", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　もちたぬき</h2>
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
            { href: "/material", content: "material" },
            { href: "/material4", content: "kawabe", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　河辺文</h2>
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
            { href: "/material", content: "material" },
            { href: "/material5", content: "Saint", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　聖人</h2>
      <div className="box content">
        <h2>十三人の英雄</h2>
        200年前、蛮族に支配されていたカリブルヌスを取り戻した英雄。人間二人と、人間以外の種族が各一人づつから成る十三人組。蛮族討伐後も、国の復興に尽力した。
        <h3>人間　ウーゼル・メレフ</h3>
        <p>　神になり生きている、当時15歳。</p>
        <p>　英雄達のリーダーにして、一番初めに国土奪還に名乗り上げた英雄。もう一人の人間の英雄であるジューダスとは親友であった。</p>
        <p>　手にした魔剣は国名の由来ともなった魔剣カリブルヌス。</p>
        <p>　赤き竜ウェールズ討伐前に持っていたはずの魔剣が存在するはずであるという学者の説もある。</p>
        <h3>エルフ　ジェフリー・オブ・モンマス</h3>
        <p>　当時あったエルフの集落の長。当時350歳、現在は死亡</p>
        <p>　記憶力が良く、一度見たモノは決して忘れないと謡うほど。</p>
        <p>　そしてその知識で、カリブルヌスの文明レベルを大破局以前とはいかなくとも、大きく取り戻した。</p>
        <p>　手にした魔剣は、天眼の概念を持つ魔杖カルンウェナン</p>
        <h2>コーンウォール村</h2>
        <p>　カリブルヌスの最南西部にある村。15年前の蛮族の襲撃によって家屋や畑は荒らされたが、竜騎士の活躍によって人的被害は少なかった。住民の多くは付近の町に移り住んだ。</p>
        <h3>アヴァロンの王</h3>
        <p>カリブルヌスの南方に広がる蛮族の領域において、竜王アルビオンによって力を授けられた6人の支配者+アルビオンの総称。王の称号の事を冠位とも表し、１つの称号につき1人のみ就くことが出来るため王の座とも呼ばれる。王は先代を殺す事で継承を行う。そのため王が他の王を殺す事で2冠3冠になる事も出来るが、王同士の戦いはお互い大きな損傷をもたらすため忌みされ歴代通しても冠位複数持ちは少ない。</p>
        <h4>竜王アルビオン</h4>
        <p>　アヴァロンの王の1人、300年前にケルディオン大陸に出現したドレイク。100年間カリブルヌスの地を支配していたが、200年前に英雄ウーゼルによって退治され南方へと逃げ、現在はその傷を癒している。</p>
        <p>　手にした魔剣の名はアヴァロン。身に受けた傷を魔力に変換する力を持つ。</p>
        <p>　彼女の白銀の炎は何であっても焼き尽くす、例え己の身であっても。</p>
        <h4>業王ヴォーティガーン</h4>
        <p>　アヴァロンの王の1人、15年前に死んだがその際従えていた蛮族の統率を失った後カリブルヌスに攻め込む。カリブルヌスは大きな被害を負う。</p>
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
            { href: "/material", content: "material" },
            { href: "/material1", content: "horagai", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ほらがい</h2>
      <MaterialPageButton />
    </>
  );
}
