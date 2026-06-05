import { useEffect, useState } from "react";
import { Breadcrumb, EmptyState, ErrorMessage, Loading } from "../components";
import { SHEET_IDS } from "../constants/sheets";
import { TABLES } from "../constants/tables";
import { useSheetData } from "../hooks/useSheetData";
import { filterRowsByColumn } from "../utils/sheetData";

function LogsDisplay({ sessionNo, tableNo }: { sessionNo: string; tableNo: string }) {
  const [expanded, setExpanded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const label = `${sessionNo}-${tableNo}`;
  const logSrc = `logs/${label}.html`;

  if (!expanded) {
    return (
      <button
        type="button"
        className="button is-large is-rounded is-primary"
        aria-expanded={false}
        onClick={() => {
          setLoadError(false);
          setExpanded(true);
        }}
      >
        {label}を表示する
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="button is-large is-rounded is-link"
        aria-expanded={true}
        onClick={() => setExpanded(false)}
      >
        {label}を非表示にする
      </button>
      {loadError && (
        <ErrorMessage message={`ログファイルが見つかりません: ${logSrc}`} />
      )}
      <iframe
        src={logSrc}
        title={`TRPGログ ${label}`}
        width="100%"
        height={800}
        loading="lazy"
        style={{ maxWidth: "100%", border: "none" }}
        onError={() => setLoadError(true)}
      />
    </>
  );
}

function LogsList() {
  const { data, error, loading, reload } = useSheetData(SHEET_IDS.LOGS);
  const [filter, setFilter] = useState("0");
  const [indices, setIndices] = useState<number[]>([]);

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
      <h2 className="title is-3">ログ一覧</h2>
      <br />
      <div className="field">
        <label className="label" htmlFor="logs-filter">
          卓で絞り込み
        </label>
        <div className="control">
          <div className="select is-fullwidth">
            <select
              id="logs-filter"
              name="breed"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="0">全体</option>
              {TABLES.filter((table) => table.id !== 0).map((table) => (
                <option key={table.id} value={table.logFilterValue}>
                  {table.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {indices.length === 0 ? (
        <EmptyState message="該当するログがありません。" />
      ) : (
        <div className="columns is-vcentered is-multiline">
          {indices.map((i) => (
            <div className="column is-12" key={`${data[i][0]}-${data[i][1]}`}>
              <p>
                {data[i][0]}-{data[i][1]},{data[i][2]}
              </p>
              <LogsDisplay sessionNo={data[i][0]} tableNo={data[i][1]} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export function LogsPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/logs", content: "Logs", active: true },
          ]}
        />
      </div>
      <LogsList />
    </>
  );
}
