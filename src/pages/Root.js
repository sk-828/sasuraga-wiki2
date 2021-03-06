import { Link } from "react-router-dom";
import {TestDamage} from "./Buki";

function RootImgs() {
  return (
    <>
      <div className="columns is-vcentered is-multiline">
        <div className="column is-4">
          <img src="img/聖人/エレイン-1.png" alt="エレイン" />
        </div>
        <div className="column is-4">
          <img src="img/黒上/モルガン.png" alt="モルガン" />
        </div>
        <div className="column is-4">
          <img src="img/ほらがい/パイラ.png" alt="パイラ" />
        </div>
        <div className="column is-">
          <img src="img/ユフトゥン/ウルスラ.png" alt="ウルスラ" />
        </div>
        <div className="column is-4">
          <img src="img/もちたぬき/シャーロット.png" alt="シャーロット" />
        </div>
        <div className="column is-4">
          <img src="img/河辺文/アルマ.png" alt="アルマ" />
        </div>
      </div>
    </>
  );
}

function RootButton() {
  return (<div className="has-text-right">
    <Link className="button is-warning" to="/character">
      キャラ図鑑を見る
    </Link>
    <Link className="button is-warning" to="/cook">
      料理を見る
    </Link>
    <Link className="button is-warning" to="/tarot">
      タロット占い
    </Link>
    <Link className="button is-warning" to="/material">
      設定資料集
    </Link>
    <Link className="button is-warning" to="/logs">
      ログを見る
    </Link>
  </div>
  );
}

export function RootPage() {
  return (
    <> <RootButton />
      <h2 className="title is-3">プレイヤーキャラクター達</h2>
      <div className="block">
        <RootImgs />
      </div>
      <TestDamage />
      <RootButton />
    </>
  );
}