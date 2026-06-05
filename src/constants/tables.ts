export interface Table {
  id: number;
  slug: string;
  name: string;
  characterRoute: string;
  materialRoute: string;
  /** Material シート（row=10）列1の PL名フィルタ値 */
  materialFilterValue: string;
  /** Logs シート（row=7）列1の PL番号フィルタ値 */
  logFilterValue: string;
}

export const TABLES: Table[] = [
  {
    id: 0,
    slug: "",
    name: "全体",
    characterRoute: "/character",
    materialRoute: "/material",
    materialFilterValue: "0",
    logFilterValue: "0",
  },
  {
    id: 1,
    slug: "yufu",
    name: "ユフトゥン",
    characterRoute: "/character1",
    materialRoute: "/material1",
    materialFilterValue: "ユフトゥン",
    logFilterValue: "1",
  },
  {
    id: 2,
    slug: "kurokami",
    name: "黒上",
    characterRoute: "/character2",
    materialRoute: "/material2",
    materialFilterValue: "黒上",
    logFilterValue: "2",
  },
  {
    id: 3,
    slug: "mochi",
    name: "もちたぬき",
    characterRoute: "/character3",
    materialRoute: "/material3",
    materialFilterValue: "もちたぬき",
    logFilterValue: "3",
  },
  {
    id: 4,
    slug: "kawabe",
    name: "河辺文",
    characterRoute: "/character4",
    materialRoute: "/material4",
    materialFilterValue: "河辺文",
    logFilterValue: "4",
  },
  {
    id: 5,
    slug: "saint",
    name: "聖人",
    characterRoute: "/character5",
    materialRoute: "/material5",
    materialFilterValue: "聖人",
    logFilterValue: "5",
  },
  {
    id: 6,
    slug: "horagai",
    name: "ほらがい",
    characterRoute: "/character6",
    materialRoute: "/material6",
    materialFilterValue: "ほらがい",
    logFilterValue: "6",
  },
];

export const CHARACTER_TITLES: Record<number, string> = {
  0: "プレイヤーキャラクター達",
  1: "ユフトゥン卓のキャラクター達",
  2: "黒上卓のNPC達",
  3: "もちたぬき卓のキャラクター達",
  4: "河辺文卓のキャラクター達",
  5: "聖人卓のキャラクター達",
  6: "ほらがい卓のキャラクター達",
};

export const MATERIAL_TITLES: Record<number, string> = {
  0: "設定資料集",
  1: "設定資料集　ユフトゥン",
  2: "設定資料集　黒上",
  3: "設定資料集　もちたぬき",
  4: "設定資料集　河辺文",
  5: "設定資料集　聖人",
  6: "設定資料集　ほらがい",
};

export function getTableByCharacterRoute(pathname: string): Table {
  return TABLES.find((t) => t.characterRoute === pathname) ?? TABLES[0];
}

export function getTableByMaterialRoute(pathname: string): Table {
  return TABLES.find((t) => t.materialRoute === pathname) ?? TABLES[0];
}
