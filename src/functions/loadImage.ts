export default function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  // eslint-disable-next-line functional/immutable-data
  img.src = src;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err: unknown) {
      reject(err);
      img.removeEventListener("error", error);
    }
    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
