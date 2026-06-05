import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, EmptyState, ErrorMessage, Loading } from "../components";
import { SHEET_IDS } from "../constants/sheets";
import { TABLES, MATERIAL_TITLES, getTableByMaterialRoute } from "../constants/tables";
import { useSheetData } from "../hooks/useSheetData";
import { filterRowsByColumn } from "../utils/sheetData";
import type { SheetData } from "../types/sheet";

function MaterialCard({ data, rowId }: { data: SheetData; rowId: number }) {
  const [expanded, setExpanded] = useState(true);
  const title = data[rowId][0];

  return (
    <div className="column is-6">
      <div className="card">
        <header className="card-header">
          <button
            type="button"
            className="card-header-title"
            aria-expanded={expanded}
            onClick={() => setExpanded((prev) => !prev)}
          >
            {title}
          </button>
        </header>
        {expanded && (
          <div className="content">
            {(data[rowId][2] ?? "").split(/\r\n|\n/).map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Gallery({ defaultFilter = "0" }: { defaultFilter?: string }) {
  const { data, error, loading, reload } = useSheetData(SHEET_IDS.MATERIAL);
  const [filter, setFilter] = useState(defaultFilter);
  const [indices, setIndices] = useState<number[]>([]);

  useEffect(() => {
    setFilter(defaultFilter);
  }, [defaultFilter]);

  useEffect(() => {
    if (data) {
      setIndices(filterRowsByColumn(data, 1, filter));
    } else {
      setIndices([]);
    }
  }, [data, filter]);

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }
  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <br />
      <div className="field">
        <label className="label" htmlFor="material-filter">
          卓で絞り込み
        </label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="material-filter"
              name="breed"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="0">全体</option>
              {TABLES.filter((table) => table.id !== 0).map((table) => (
                <option key={table.id} value={table.materialFilterValue}>
                  {table.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {indices.length === 0 ? (
        <EmptyState message="該当する設定資料がありません。" />
      ) : (
        <div className="columns is-vcentered is-multiline">
          {indices.map((i) => (
            <MaterialCard data={data} rowId={i} key={data[i][0]} />
          ))}
        </div>
      )}
    </>
  );
}

function MaterialPageButton() {
  return (
    <div className="has-text-right">
      {TABLES.map((table) => (
        <Link key={table.id} className="button is-warning" to={table.materialRoute}>
          {table.name}
        </Link>
      ))}
    </div>
  );
}

function SaintMaterialContent() {
  return (
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
  );
}

export function MaterialPage() {
  const { pathname } = useLocation();
  const table = getTableByMaterialRoute(pathname);
  const breadcrumbLinks = [
    { href: "/", content: "Top" },
    { href: "/material", content: "material", active: table.id === 0 },
  ];
  if (table.id !== 0) {
    breadcrumbLinks.push({
      href: table.materialRoute,
      content: table.slug,
      active: true,
    });
  }

  const defaultFilter = table.materialFilterValue;

  return (
    <>
      <div className="box">
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">{MATERIAL_TITLES[table.id]}</h2>
      {table.id === 5 && <SaintMaterialContent />}
      <Gallery defaultFilter={defaultFilter} />
      <MaterialPageButton />
    </>
  );
}
