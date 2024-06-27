export const toRGBA = (arr: number[]) => arr.map((v, i) => (i !== 3 && arr[3] !== 0 ? Math.round(v * 255) : v));

export const toRGBAGradient = (arr: number[]) => {
  return arr.map((v) => Math.round(v * 255));
};
