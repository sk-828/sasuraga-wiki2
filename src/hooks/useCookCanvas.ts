import { useEffect, useState } from "react";
import { drawCookCard, getCookImageSources, loadImages } from "../utils/drawCookCard";
import type { CookCardData } from "../types/sheet";

export function useCookCanvas(canvasId: string, cardData: CookCardData | null, enabled = true) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!enabled || !cardData) {
      return undefined;
    }

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvas) {
      return undefined;
    }

    let cancelled = false;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError(new Error("Canvas の初期化に失敗しました。"));
      return undefined;
    }

    setLoaded(false);
    setError(null);

    loadImages(getCookImageSources(cardData.cookImg))
      .then((images) => {
        if (!cancelled) {
          ctx.font = "30px hm_tb";
          drawCookCard(ctx, images, cardData);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            new Error(
              `料理カードの画像を読み込めませんでした（${cardData.cookImg}）。public/pages/img/ を確認してください。`
            )
          );
          setLoaded(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [canvasId, cardData, enabled]);

  return { loaded, error };
}
