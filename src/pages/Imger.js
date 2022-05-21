import { useEffect, useState } from "react";
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


function Image(urls) {
  const [url, setUrl] = useState(null);
  const [n, setN] = useState(null);
  useEffect(() => {
    var array = [];
    array = urls.src.split(',');
    setUrl(array);
    setN(0);
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
            if(url.length>1){
              return <img className="imger" src={"images/multiFile.png"} width={"30"} height={"30"} />;
            } 
          })()
        }
        <img className="imger" src={"img/" + url[n]} onClick={click} />
      </>);
  } else {
    <Loading></Loading>
  }
}

function CharaCard(props) {
  return (
    <div className="column is-6">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{props.data[props.ID][0]}</p>
        </header>
        <div className="card-image">
          <Image src={props.data[props.ID][2]} />
        </div>
        <div className="content">
          <p>プレイヤー:{props.data[props.ID][1]}</p>
          {props.data[props.ID][3]}
        </div>
      </div>
    </div>
  );
}

function Gallery(props) {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  var temp = [];
  useEffect(() => {
    if (data == null) {
      for (var i = 0; i < 0; i++) {
        temp.push(i);
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  useEffect(() => {
    fetchSeet(props.ID).then((type) => {
      setData(type);
      for (var i = 0; i < type.length; i++) {
        temp.push(i);
      }
      setArray(temp);
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
            <CharaCard data={data} ID={i}></CharaCard>
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
      <Gallery ID={0}></Gallery>
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
      <Gallery ID={1}></Gallery>
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
      <Gallery ID={2}></Gallery>
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
      <Gallery ID={3}></Gallery>
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
      <Gallery ID={4}></Gallery>
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
            { href: "/character1", content: "Saint", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">聖人卓のキャラクター達</h2>
      <Gallery ID={5}></Gallery>
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
            { href: "/character1", content: "horagai", active: true },
          ]}
        />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">ほらがい卓のキャラクター達</h2>
      <Gallery ID={6}></Gallery>
      <CharaPageButton />
    </>
  );
}