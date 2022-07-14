import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";
import { fetchSeet } from "../api";

function getCsv(url) {
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //1次元配列を2次元配列に変換
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    //空白行が出てきた時点で終了
    if (arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');
  }
  return res;
}

function makeArray(data) {
  var temp = [];
  if (data != null) {
    for (var i = 1; i < data.length; i++) {
      temp.push(i);
    }
  }
  return temp;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function Image(urls) {
  const [url, setUrl] = useState(null);
  const [n, setN] = useState(null);
  useEffect(() => {
    var array = [];
    array = urls.src.split(',');
    setUrl(array);
    if (urls.ID === 0) {
      setN(getRandomInt(0, array.length));
    } else {
      setN(0);
    }
  }, []);
  function click() {
    if (n === url.length - 1) {
      setN(0);
    } else {
      setN(n + 1);
    }
  }
  if (url !== null) {
    return (
      <>
        {
          (() => {
            if (url.length > 1) {
              return <img className="imger" src={"images/multiFile.png"} width={"30"} height={"30"} />;
            }
          })()
        }
        <img className="imger" src={"img/" + url[n]} onClick={click} />
      </>);
  } else {
    <Loading />
  }
}

function CharaCard(props) {
  const [stat, setStat] = useState(0);
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
          <div className="card-image">
            <Image src={props.data[props.ID][2]} ID={props.user} />
          </div>
          <div className="content">
            <p>プレイヤー:{props.data[props.ID][1]}</p>
            {props.data[props.ID][3]}
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
          <div className="card-image">
            <Image src={props.data[props.ID][2]} ID={props.user} />
          </div>
          <div className="content">
            <p>プレイヤー:{props.data[props.ID][1]}</p>
          </div>
        </div>
      </div>
    );
  }
}

function Gallery(props) {
  const [data, setData] = useState(null);
  const array = useMemo(() => makeArray(data), [data]);
  console.log(data);
  useEffect(() => {
    fetchSeet(props.ID).then((type) => {
      setData(type);
    });
  }, []);
  if (data == null) {
    return <Loading />
  }
  return (
    <>
      <br></br>
      <div className="columns is-vcentered is-multiline">
        {array.map((i) => {
          return (
            <CharaCard data={data} ID={i} key={i} user={props.ID} />
          );
        })}

      </div></>
  );
}

function CharaPageButton() {
  return (<div className="has-text-right">
    <Link className="button is-warning" to="/character">
      全体
    </Link>
    <Link className="button is-warning" to="/character1">
      ユフトゥン
    </Link>
    <Link className="button is-warning" to="/character2">
      黒上
    </Link>
    <Link className="button is-warning" to="/character3">
      もちたぬき
    </Link>
    <Link className="button is-warning" to="/character4">
      河辺文
    </Link>
    <Link className="button is-warning" to="/character5">
      聖人
    </Link>
    <Link className="button is-warning" to="/character6">
      ほらがい
    </Link>
  </div>);
}

export function CharacterPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">プレイヤーキャラクター達</h2>
      <Gallery ID={0} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage1() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character1", content: "yufu", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">ユフトゥン卓のキャラクター達</h2>
      <Gallery ID={1} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage2() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character2", content: "kurokami", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">黒上卓のNPC達</h2>
      <Gallery ID={2} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage3() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character3", content: "mochi", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">もちたぬき卓のキャラクター達</h2>
      <Gallery ID={3} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage4() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character4", content: "kawabe", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">河辺文卓のキャラクター達</h2>
      <Gallery ID={4} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage5() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character5", content: "Saint", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">聖人卓のキャラクター達</h2>
      <Gallery ID={5} />
      <CharaPageButton />
    </>
  );
}

export function CharacterPage6() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/character", content: "Chara" },
            { href: "/character6", content: "horagai", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">ほらがい卓のキャラクター達</h2>
      <Gallery ID={6} />
      <CharaPageButton />
    </>
  );
}