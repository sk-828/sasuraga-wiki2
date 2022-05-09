import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurants } from "../api.js";
import { Loading, Restaurant } from "../components";

function RootImgs(){
  return(
    <>
    <div className="columns is-vcentered is-multiline">
      <div className="column is-4">
      <img src="img/聖人/エレイン-1.png" alt="エレイン"/>
      </div>
      <div className="column is-4">
      <img src="img/黒上/モルガン.png" alt="モルガン"/>
      </div>
      <div className="column is-4">
      <img src="img/ほらがい/パイラ.png" alt="パイラ"/>
      </div>
      <div className="column is-">
      <img src="img/ユフトゥン/ウルスラ.png" alt="ウルスラ"/>
      </div>
      <div className="column is-4">
      <img src="img/もちたぬき/シャーロット.png" alt="シャーロット"/>
      </div>
      <div className="column is-4">
      <img src="img/河辺文/アルマ.png" alt="アルマ"/>
      </div>
    </div>
    <p><a href="page/imger.html">キャラ図鑑へ</a></p>
    </>
  );
}

export function RootPage() {
  return (
    <>
      <h2 className="title is-3">プレイヤーキャラクター達</h2>
      <div className="block">
        <RootImgs />
      </div>
      <div className="has-text-right">
        <Link className="button is-warning" to="/character">
          キャラ図鑑を見る
        </Link>
      </div>
      <iframe width="650" height="400" src="logs/1-1.html"></iframe>
      <iframe width="650" height="400" src="logs/2-2.html"></iframe>
      <iframe width="650" height="400" src="logs/3-3.html"></iframe>
      <iframe width="650" height="400" src="logs/4-1.html"></iframe>
      <iframe width="650" height="400" src="logs/5-2.html"></iframe>
      <iframe width="650" height="400" src="logs/6-4.html"></iframe>
    </>
  );
}