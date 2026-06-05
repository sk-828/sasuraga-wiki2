import { useCallback, useEffect, useState } from "react";
import { fetchSheet } from "../api";
import { makeRowIndices } from "../utils/sheetData";
import type { SheetData } from "../types/sheet";

export function useSheetData(sheetId: number) {
  const [data, setData] = useState<SheetData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setError(null);
    setLoading(true);

    fetchSheet(sheetId)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("データの取得に失敗しました。"));
          setData(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sheetId, reloadKey]);

  const indices = makeRowIndices(data);

  return { data, indices, error, loading, reload };
}
