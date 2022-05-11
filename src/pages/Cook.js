import { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";

function MakeCookCanvas() {
  const [name, setName] = useState(null);
  const [text, setText] = useState(null);
  const [No, setNo] = useState(null);
  const [material, setMate] = useState(null);
  var chara = new Array(1, 0, 2, 0);//顔アイコンの表示,0=非表示,1=エレイン,2=モルガン,3=パイラ,4=ウルスラ,5=シャーロット,6=アルマ
  var maker = 3;//ここに作成者,1=エレイン,2=モルガン,3=パイラ,4=ウルスラ,5=シャーロット,6=アルマ
  var data = "5/6";//ここに日付
  var scenario = "6-4河辺卓1回目妖精の森";//ここにシナリオ名前
  var eat = new Array(1, 1, 1, 1, 1, 1);//食べた人,1が表示、0が非表示,左からエレイン、モルガン、パイラ、ウルスラ、シャーロット、アルマ
  var cookImg = "rostusagi.png";//画像ファイル名,imgファイルに画像は入れてね。

  // contextを状態として持つ
  const [ctx, setContext] = useState(null)
  // 画像読み込み完了トリガー
  const [loaded, setLoaded] = useState(false)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    setName("料理名を決めなさい");
    setText("ここに好評を書きなさい&改行をしたかったら＆を使いなさい&＆は小文字で入力するんだぞ");
    setMate("素材を書きなさい");
    setNo("0");
    const canvas = document.getElementById("make")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  }, [])
  // 状態にコンテキストが登録されたらそれに対して操作できる
  useEffect(() => {
    if (ctx !== null) {
      ctx.font = "30px hm_tb";
      // 画像読み込み
      var images = [];
      var srcs = ["pages/img/background.jpg", "pages/img/1.png", "pages/img/2.png", "pages/img/3.png", "pages/img/4.png", "pages/img/5.png", "pages/img/6.png", "pages/img/" + cookImg,];
      var loadCount = 0;
      for (var i = 0; i < srcs.length; i++) {
        // Imageのインスタンスを生成し、それぞれの画像を設定
        images[i] = new Image();
        images[i].src = srcs[i];
        images[i].onload = function () {
          loadCount++;
          if (loadCount >= images.length) {
            ctx.drawImage(images[0], 0, 0);
            for (let i = 0; i < 4; i++) {
              if (chara[i] === 1) {
                ctx.drawImage(images[1], 790, 465 + i * 60);
              } else if (chara[i] === 2) {
                ctx.drawImage(images[2], 790, 465 + i * 60);
              } else if (chara[i] === 3) {
                ctx.drawImage(images[3], 790, 465 + i * 60);
              } else if (chara[i] === 4) {
                ctx.drawImage(images[4], 790, 465 + i * 60);
              } else if (chara[i] === 5) {
                ctx.drawImage(images[5], 790, 465 + i * 60);
              } else if (chara[i] === 6) {
                ctx.drawImage(images[6], 790, 465 + i * 60);
              }
            }
            if (eat[0] === 1) {
              ctx.drawImage(images[1], 1180, 160);
            }
            if (eat[1] === 1) {
              ctx.drawImage(images[2], 1180, 222);
            }
            if (eat[2] === 1) {
              ctx.drawImage(images[3], 1180, 284);
            }
            if (eat[3] === 1) {
              ctx.drawImage(images[4], 1260, 160);
            }
            if (eat[4] === 1) {
              ctx.drawImage(images[5], 1260, 222);
            }
            if (eat[5] === 1) {
              ctx.drawImage(images[6], 1260, 284);
            }
            for (let i = 1; i < 7; i++) {
              if (maker === i) {
                ctx.drawImage(images[i], 560, 660);
              }
            }
            var cookWidth = images[7].width;
            var cookHeight = images[7].height;
            var widthRate = cookWidth / 480;
            var heightRate = cookHeight / 310;
            var imgWidth;
            var imgHeight;
            var I = 480 * 310;
            if (widthRate > heightRate) {
              if (widthRate > 1) {
                imgWidth = cookWidth / widthRate;
                imgHeight = cookHeight / widthRate;
              } else {
                imgWidth = cookWidth / heightRate;
                imgHeight = cookHeight / heightRate;
              }
            } else {
              if (heightRate > 1) {
                imgWidth = cookWidth / heightRate;
                imgHeight = cookHeight / heightRate;
              } else {
                imgWidth = cookWidth / widthRate;
                imgHeight = cookHeight / widthRate;
              }
            }
            ctx.drawImage(images[7], 360 - imgWidth / 2, 500 - imgHeight / 2, imgWidth, imgHeight);
            ctx.font = "30px hm_tb";
            for (var lines = text.split("&"), i = 0, l = lines.length; l > i; i++) {
              ctx.fillText(lines[i], 880, 510 + i * 60);
            }
            ctx.fillText(data, 870, 45);
            ctx.fillText(scenario, 940, 83);
            for (var lines = material.split("\n"), i = 0, l = lines.length; l > i; i++) {
              ctx.fillText(lines[i], 830, 200 + i * 40);
            }
            ctx.font = "35px hm_tb";
            ctx.fillText(name, 110, 265);
            ctx.fillText(No, 520, 155);
            setLoaded(true)
          }
        }
      }
    }
  }, [ctx, name,text,No,material])
  useEffect(() => {
    if (loaded) {
      // それに続く処理
    }
  }, [loaded])
  function handleSubmit(event) {
    event.preventDefault();
    let userText = document.getElementById('userText');
    setName(userCookName.value);
    setText(userText.value);
    setNo(userNumber.value);
    setMate(userMate.value);
  }
  return (<>
    <form onSubmit={handleSubmit}>
      <div className="field has-addons">
        <input type={text} id="userCookName" placeholder="料理名" />
        <input type={text} id="userText" placeholder="好評" />
        <input type={text} id="userMate" placeholder="素材" />
        <input type={text} id="userNumber" placeholder="No" />
        <div className="control">
          <button type="submit" className="button is-dark">
            Set
          </button>
        </div>
      </div>
    </form>
    <canvas width="1440" height="810" id="make"></canvas>
  </>);
}


const CookCanvas = () => {
  const chara = new Array(1, 0, 2, 0);//顔アイコンの表示,0=非表示,1=エレイン,2=モルガン,3=パイラ,4=ウルスラ,5=シャーロット,6=アルマ
  const text = "普通じゃない森にこんなまともな\n生き物がいたなんてね・・・\nうん、うまい。";//短評,\nで改行
  const maker = 3;//ここに作成者,1=エレイン,2=モルガン,3=パイラ,4=ウルスラ,5=シャーロット,6=アルマ
  const name = "ウサギ肉のロースト"; //ここに料理の名前
  const material = "・ウサギ肉";//ここに素材,\nで改行
  const No = "4";//ここに番号
  const data = "5/6";//ここに日付
  const scenario = "6-4河辺卓1回目妖精の森";//ここにシナリオ名前
  const eat = new Array(1, 1, 1, 1, 1, 1);//食べた人,1が表示、0が非表示,左からエレイン、モルガン、パイラ、ウルスラ、シャーロット、アルマ
  const cookImg = "rostusagi.png";//画像ファイル名,imgファイルに画像は入れてね。


  // contextを状態として持つ
  const [ctx, setContext] = useState(null)
  // 画像読み込み完了トリガー
  const [loaded, setLoaded] = useState(false)
  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    const canvas = document.getElementById("canvas")
    const canvasContext = canvas.getContext("2d")
    setContext(canvasContext)
  }, [])
  // 状態にコンテキストが登録されたらそれに対して操作できる
  useEffect(() => {
    if (ctx !== null) {
      ctx.font = "30px hm_tb";
      // 画像読み込み
      var images = [];
      var srcs = ["pages/img/background.jpg", "pages/img/1.png", "pages/img/2.png", "pages/img/3.png", "pages/img/4.png", "pages/img/5.png", "pages/img/6.png", "pages/img/" + cookImg,];
      var loadCount = 0;
      for (var i = 0; i < srcs.length; i++) {
        // Imageのインスタンスを生成し、それぞれの画像を設定
        images[i] = new Image();
        images[i].src = srcs[i];
        images[i].onload = function () {
          loadCount++;
          if (loadCount >= images.length) {
            ctx.drawImage(images[0], 0, 0);
            for (let i = 0; i < 4; i++) {
              if (chara[i] === 1) {
                ctx.drawImage(images[1], 790, 465 + i * 60);
              } else if (chara[i] === 2) {
                ctx.drawImage(images[2], 790, 465 + i * 60);
              } else if (chara[i] === 3) {
                ctx.drawImage(images[3], 790, 465 + i * 60);
              } else if (chara[i] === 4) {
                ctx.drawImage(images[4], 790, 465 + i * 60);
              } else if (chara[i] === 5) {
                ctx.drawImage(images[5], 790, 465 + i * 60);
              } else if (chara[i] === 6) {
                ctx.drawImage(images[6], 790, 465 + i * 60);
              }
            }
            if (eat[0] === 1) {
              ctx.drawImage(images[1], 1180, 160);
            }
            if (eat[1] === 1) {
              ctx.drawImage(images[2], 1180, 222);
            }
            if (eat[2] === 1) {
              ctx.drawImage(images[3], 1180, 284);
            }
            if (eat[3] === 1) {
              ctx.drawImage(images[4], 1260, 160);
            }
            if (eat[4] === 1) {
              ctx.drawImage(images[5], 1260, 222);
            }
            if (eat[5] === 1) {
              ctx.drawImage(images[6], 1260, 284);
            }
            for (let i = 1; i < 7; i++) {
              if (maker === i) {
                ctx.drawImage(images[i], 560, 660);
              }
            }
            var cookWidth = images[7].width;
            var cookHeight = images[7].height;
            var widthRate = cookWidth / 480;
            var heightRate = cookHeight / 310;
            var imgWidth;
            var imgHeight;
            var I = 480 * 310;
            if (widthRate > heightRate) {
              if (widthRate > 1) {
                imgWidth = cookWidth / widthRate;
                imgHeight = cookHeight / widthRate;
              } else {
                imgWidth = cookWidth / heightRate;
                imgHeight = cookHeight / heightRate;
              }
            } else {
              if (heightRate > 1) {
                imgWidth = cookWidth / heightRate;
                imgHeight = cookHeight / heightRate;
              } else {
                imgWidth = cookWidth / widthRate;
                imgHeight = cookHeight / widthRate;
              }
            }
            ctx.drawImage(images[7], 360 - imgWidth / 2, 500 - imgHeight / 2, imgWidth, imgHeight);
            ctx.font = "30px hm_tb";
            for (var lines = text.split("\n"), i = 0, l = lines.length; l > i; i++) {
              ctx.fillText(lines[i], 880, 530 + i * 60);
            }
            ctx.fillText(data, 870, 45);
            ctx.fillText(scenario, 940, 83);
            for (var lines = material.split("\n"), i = 0, l = lines.length; l > i; i++) {
              ctx.fillText(lines[i], 830, 200 + i * 40);
            }
            ctx.font = "35px hm_tb";
            ctx.fillText(name, 110, 265);
            ctx.fillText(No, 520, 155);
            setLoaded(true)
          }
        }
      }
    }
  }, [ctx])
  useEffect(() => {
    if (loaded) {
      // それに続く処理
    }
  }, [loaded])
  return <canvas width="1440" height="810" id="canvas"></canvas>
}



function Cook() {
  return (
    <>
      <MakeCookCanvas></MakeCookCanvas>
      <CookCanvas></CookCanvas>
    </>
  );
}

export function CookPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
          ]}
        />
      </div>
      <Cook></Cook>
    </>
  );
}