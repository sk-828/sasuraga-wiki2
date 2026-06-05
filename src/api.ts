import type { SheetData } from "./types/sheet";

const FETCH_TIMEOUT_MS = 10000;

function getGasUrl(): string {
  const url = import.meta.env.VITE_GAS_URL;
  if (!url) {
    throw new Error("VITE_GAS_URL が設定されていません。.env を確認してください。");
  }
  return url;
}

function parseSheetData(raw: unknown): SheetData {
  if (!Array.isArray(raw)) {
    throw new Error("スプレッドシートのデータ形式が不正です。");
  }
  if (!raw.every((row) => Array.isArray(row))) {
    throw new Error("スプレッドシートの行データが不正です。");
  }
  return raw as SheetData;
}

export async function fetchSheet(id: number): Promise<SheetData> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${getGasUrl()}?row=${id}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`データの取得に失敗しました（HTTP ${response.status}）。GAS の再デプロイを確認してください。`);
    }

    let raw: unknown;
    try {
      raw = await response.json();
    } catch {
      throw new Error("スプレッドシート API が JSON 以外を返しました。GAS のエラーを確認してください。");
    }

    return parseSheetData(raw);
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        throw new Error("データの取得がタイムアウトしました。ネットワークを確認してください。");
      }
      throw err;
    }
    throw new Error("データの取得中に不明なエラーが発生しました。");
  } finally {
    window.clearTimeout(timeoutId);
  }
}
