export default function loadAudio(src: string): Promise<HTMLAudioElement> {
  const audio = document.createElement("audio");
  // eslint-disable-next-line functional/immutable-data
  audio.src = src;
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    function loaded(): void {
      resolve(audio);
      audio.removeEventListener("load", loaded);
    }

    function error(err: unknown): void {
      reject(err);
      audio.removeEventListener("error", error);
    }

    audio.addEventListener("load", loaded);
    audio.addEventListener("error", error);
  });
}
