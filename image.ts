type FindImageData = {
  [key: string]: FindImageData | string;
} & {
  img: {
    "@_src": string;
  };
};

export function findFirstImage(data: FindImageData | undefined) {
  if (data === undefined) return undefined;
  const keys = Object.keys(data);
  for (const key of keys) {
    if (key === "img") {
      return data.img["@_src"];
    }
    if (typeof data[key] === "object") {
      return findFirstImage(data[key]);
    }
  }
}

export function tryDifferentAttributes(
  functions: (() => string | undefined)[],
): string | undefined {
  for (const func of functions) {
    const image = func();
    if (image !== undefined) {
      return image;
    }
  }
}
