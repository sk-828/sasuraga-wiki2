import { Link } from "react-router-dom";
import { Breadcrumb } from "../components";

export function NotFoundPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/404", content: "Not Found", active: true },
          ]}
        />
      </div>
      <h2 className="title is-3">ページが見つかりません</h2>
      <p>
        <Link to="/">トップページへ戻る</Link>
      </p>
    </>
  );
}
