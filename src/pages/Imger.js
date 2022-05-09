import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";

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


function Image(url) {
  return (<img className="imger" src={"img/" + url.src} />);
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
function Gallery(props){
  var array=[0,1,2,3,4,5]
  if(props.array==null){
    return<Loading />
  }
  return (
    <><h2>プレイヤーキャラクター達</h2>
      <br></br>
      <div className="columns is-vcentered is-multiline">
      {array.map((i) => {
        return (
          <CharaCard data={props.array} ID={i}></CharaCard>
        );
      })}

      </div></>
  );
}
export function CharacterPage() {
  const [data, setData] = useState(null);
  var temp=[];
  useEffect(() => {
    temp = getCsv("csv/imager.csv");
    setData(temp);
  }, []);
    return (
      <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
          ]}
        />
      </div>
      <Gallery array={data}></Gallery>
      </>
    );
  }