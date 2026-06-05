export type SheetRow = string[];
export type SheetData = SheetRow[];

export interface CookCardData {
  chara: number[];
  text: string;
  maker: number;
  name: string;
  material: string;
  No: string;
  data: string;
  scenario: string;
  eat: number[];
  cookImg: string;
  materialDelimiter?: string;
}
