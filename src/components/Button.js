import { Link } from "react-router-dom";

export function RootButton() {
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