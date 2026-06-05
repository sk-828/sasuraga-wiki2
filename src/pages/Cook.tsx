import { useMemo, useState } from "react";
import { Breadcrumb, EmptyState, ErrorMessage, Loading } from "../components";
import { SHEET_IDS } from "../constants/sheets";
import { useSheetData } from "../hooks/useSheetData";
import { useCookCanvas } from "../hooks/useCookCanvas";
import type { CookCardData, SheetRow } from "../types/sheet";

function parseCookRow(row: SheetRow): CookCardData {
  return {
    chara: [row[0], row[1], row[2], row[3]].map((v) => Number(v) || 0),
    text: row[4] ?? "",
    maker: Number(row[5]) || 0,
    name: row[6] ?? "料理",
    material: row[7] ?? "",
    No: row[8] ?? "",
    data: row[9] ?? "",
    scenario: row[10] ?? "",
    eat: [row[11], row[12], row[13], row[14], row[15], row[16]].map((v) => Number(v) || 0),
    cookImg: row[17] ?? "",
    materialDelimiter: "&",
  };
}

function CookCanvas({ row, rowIndex }: { row: SheetRow; rowIndex: number }) {
  const cardData = useMemo(() => parseCookRow(row), [row]);
  const canvasId = `cook-${rowIndex}`;
  const { loaded, error } = useCookCanvas(canvasId, cardData, true);

  return (
    <div className="cook-canvas-wrapper">
      {error && <ErrorMessage message={error.message} />}
      {!error && !loaded && <Loading />}
      <canvas
        width={1440}
        height={810}
        id={canvasId}
        className="cook-canvas"
        aria-label={`${cardData.name}の料理カード`}
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
}

function CookButton({ row, rowIndex }: { row: SheetRow; rowIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const cookName = row[6] ?? "料理";

  if (!expanded) {
    return (
      <button
        type="button"
        className="button is-large is-rounded is-primary"
        aria-expanded={false}
        onClick={() => setExpanded(true)}
      >
        {cookName}を表示する
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="button is-rounded is-link"
        aria-expanded={true}
        onClick={() => setExpanded(false)}
      >
        {cookName}非表示にする
      </button>
      <CookCanvas row={row} rowIndex={rowIndex} />
    </>
  );
}

function Cook() {
  const { data, indices, error, loading, reload } = useSheetData(SHEET_IDS.COOK);

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }
  if (loading || !data) {
    return <Loading />;
  }
  if (indices.length === 0) {
    return <EmptyState message="料理データがありません。" />;
  }

  return (
    <div className="columns is-vcentered is-multiline">
      {indices.map((i) => (
        <div className="column is-12" key={`${data[i][6]}-${i}`}>
          <CookButton row={data[i]} rowIndex={i} />
        </div>
      ))}
    </div>
  );
}

export function CookPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/cook", content: "Cooks", active: true },
          ]}
        />
      </div>
      <Cook />
    </>
  );
}
