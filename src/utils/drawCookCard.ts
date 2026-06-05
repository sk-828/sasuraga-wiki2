import type { CookCardData } from "../types/sheet";

const BACKGROUND_SRCS = [
  "pages/img/background.jpg",
  "pages/img/1.png",
  "pages/img/2.png",
  "pages/img/3.png",
  "pages/img/4.png",
  "pages/img/5.png",
  "pages/img/6.png",
];

function drawCharaIcon(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  charaValue: number,
  yOffset: number
) {
  if (charaValue >= 1 && charaValue <= 6) {
    ctx.drawImage(images[charaValue], 790, 465 + yOffset);
  }
}

function calcCookImageSize(cookWidth: number, cookHeight: number) {
  const widthRate = cookWidth / 480;
  const heightRate = cookHeight / 310;
  let imgWidth: number;
  let imgHeight: number;

  if (widthRate > heightRate) {
    if (widthRate > 1) {
      imgWidth = cookWidth / widthRate;
      imgHeight = cookHeight / widthRate;
    } else {
      imgWidth = cookWidth / heightRate;
      imgHeight = cookHeight / heightRate;
    }
  } else if (heightRate > 1) {
    imgWidth = cookWidth / heightRate;
    imgHeight = cookHeight / heightRate;
  } else {
    imgWidth = cookWidth / widthRate;
    imgHeight = cookHeight / widthRate;
  }

  return { imgWidth, imgHeight };
}

export function getCookImageSources(cookImg: string): string[] {
  return [...BACKGROUND_SRCS, `pages/img/${cookImg}`];
}

export function drawCookCard(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  cardData: CookCardData
) {
  const {
    chara,
    text,
    maker,
    name,
    material,
    No,
    data,
    scenario,
    eat,
    materialDelimiter = "&",
  } = cardData;

  ctx.drawImage(images[0], 0, 0);

  for (let i = 0; i < 4; i++) {
    drawCharaIcon(ctx, images, chara[i], i * 60);
  }

  const eatPositions: [number, number][] = [
    [1180, 160],
    [1180, 222],
    [1180, 284],
    [1260, 160],
    [1260, 222],
    [1260, 284],
  ];
  eat.forEach((value, index) => {
    if (value === 1) {
      ctx.drawImage(images[index + 1], eatPositions[index][0], eatPositions[index][1]);
    }
  });

  if (maker >= 1 && maker <= 6) {
    ctx.drawImage(images[maker], 560, 660);
  }

  const cookImage = images[7];
  const { imgWidth, imgHeight } = calcCookImageSize(cookImage.width, cookImage.height);
  ctx.drawImage(cookImage, 360 - imgWidth / 2, 500 - imgHeight / 2, imgWidth, imgHeight);

  ctx.font = "30px hm_tb";
  text.split(materialDelimiter).forEach((line, i) => {
    ctx.fillText(line, 880, 510 + i * 60);
  });
  ctx.fillText(data, 870, 45);
  ctx.fillText(scenario, 940, 83);
  material.split(materialDelimiter).forEach((line, i) => {
    ctx.fillText(line, 830, 200 + i * 40);
  });
  ctx.font = "35px hm_tb";
  ctx.fillText(name, 110, 265);
  ctx.fillText(No, 520, 155);
}

export function loadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = src;
        })
    )
  );
}
