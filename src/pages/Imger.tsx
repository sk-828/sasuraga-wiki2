import { useEffect, useState, useLayoutEffect, KeyboardEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { TABLES, CHARACTER_TITLES, getTableByCharacterRoute } from "../constants/tables";
import { Breadcrumb, EmptyState, ErrorMessage, Loading } from "../components";
import { useSheetData } from "../hooks/useSheetData";
import type { SheetData } from "../types/sheet";

const useWindowSize = (): [number, number] => {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

function getRandomInt(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
}

function handleToggleKeyDown(event: KeyboardEvent, toggle: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggle();
  }
}

interface ImageProps {
  src: string;
  alt?: string;
  sheetId: number;
  width: number;
}

function Image({ src, alt, sheetId, width }: ImageProps) {
  const [url, setUrl] = useState<string[] | null>(null);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const array = src.split(",");
    setUrl(array);
    setN(sheetId === 0 ? getRandomInt(0, array.length) : 0);
  }, [src, sheetId]);

  function click() {
    if (url === null || n === null) return;
    setN(n === url.length - 1 ? 0 : n + 1);
  }

  if (url === null || n === null) {
    return <Loading />;
  }

  const imageClass = width < 1000 ? "imgers" : "imger";

  return (
    <>
      {url.length > 1 && (
        <img className="imger" src="images/multiFile.png" width={30} height={30} alt="複数画像" />
      )}
      <img
        className={imageClass}
        src={`img/${url[n]}`}
        alt={alt || "キャラクター画像"}
        onClick={click}
        loading="lazy"
      />
    </>
  );
}

interface CharaCardProps {
  data: SheetData;
  ID: number;
  sheetId: number;
  width: number;
}

function CharaCard({ data, ID, sheetId, width }: CharaCardProps) {
  const [expanded, setExpanded] = useState(width > 1000 ? 1 : 0);
  const description = data[ID][3] ?? "";

  useEffect(() => {
    if (width > 1000) {
      setExpanded(1);
    }
  }, [width]);

  const toggle = () => setExpanded(expanded === 1 ? 0 : 1);

  return (
    <div className="column is-6">
      <div className="card">
        <header className="card-header">
          <p
            className="card-header-title"
            role="button"
            tabIndex={0}
            aria-expanded={expanded === 1}
            onClick={toggle}
            onKeyDown={(e) => handleToggleKeyDown(e, toggle)}
          >
            {data[ID][0]}
          </p>
        </header>
        <div className="card-image">
          <Image src={data[ID][2]} alt={data[ID][0]} sheetId={sheetId} width={width} />
        </div>
        <div className="content">
          <p>プレイヤー:{data[ID][1]}</p>
          {expanded === 1 &&
            description.split(/\r\n|\n/).map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function Gallery({ sheetId }: { sheetId: number }) {
  const { data, indices, error, loading, reload } = useSheetData(sheetId);
  const [width] = useWindowSize();

  if (error) {
    return <ErrorMessage message={error.message} onRetry={reload} />;
  }
  if (loading || !data) {
    return <Loading />;
  }
  if (indices.length === 0) {
    return <EmptyState message="キャラクターデータがありません。" />;
  }

  return (
    <>
      <br />
      <div className="columns is-vcentered is-multiline">
        {indices.map((i) => (
          <CharaCard data={data} ID={i} key={data[i][0] || i} sheetId={sheetId} width={width} />
        ))}
      </div>
    </>
  );
}

function CharaPageButton() {
  return (
    <div className="has-text-right">
      {TABLES.map((table) => (
        <Link key={table.id} className="button is-warning" to={table.characterRoute}>
          {table.name}
        </Link>
      ))}
    </div>
  );
}

export function CharacterPage() {
  const { pathname } = useLocation();
  const table = getTableByCharacterRoute(pathname);
  const breadcrumbLinks = [
    { href: "/", content: "Top" },
    { href: "/character", content: "Chara", active: table.id === 0 },
  ];
  if (table.id !== 0) {
    breadcrumbLinks.push({
      href: table.characterRoute,
      content: table.slug,
      active: true,
    });
  }

  return (
    <>
      <div className="box">
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <CharaPageButton />
      <h2 className="title is-3">{CHARACTER_TITLES[table.id]}</h2>
      <Gallery sheetId={table.id} />
      <CharaPageButton />
    </>
  );
}
