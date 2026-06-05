import type { SheetData } from "../types/sheet";

export function makeRowIndices(data: SheetData | null): number[] {
  if (!data) return [];
  return Array.from({ length: data.length - 1 }, (_, i) => i + 1);
}

export function filterRowsByColumn(
  data: SheetData,
  columnIndex: number,
  filterValue: string | number
): number[] {
  const indices: number[] = [];
  for (let i = 1; i < data.length; i++) {
    if (filterValue === "0" || filterValue === 0 || String(data[i][columnIndex]) === String(filterValue)) {
      indices.push(i);
    }
  }
  return indices;
}
