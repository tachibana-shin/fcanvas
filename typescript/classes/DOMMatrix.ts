const DOMatrix =
  window.DOMMatrix ||
  class {
    a: number = 1;
    b: number = 0;
    c: number = 0;
    d: number = 1;
    e: number = 0;
    f: number = 0;
    /**
     * @param {string} css
     * @return {any}
     */
    constructor(css: string) {
      const vnode: HTMLDivElement = document.createElement("div");
      vnode.style.opacity = "0";
      vnode.style.position = "fixed";
      vnode.style.top = vnode.style.left = -9e99 + "px";
      vnode.style.transform = css;
      document.documentElement.appendChild(vnode);
      let { transform }: { transform: string } = getComputedStyle(vnode);

      if (transform === "none") {
        transform = "1, 0, 0, 1, 0, 0";
      }
      document.documentElement.removeChild(vnode);

      [this.a, this.b, this.c, this.d, this.e, this.f] = transform
        .replace(/^(?:matrix3d|matrix)\(|\s|\)$/g, "")
        .split(",")
        .map((e) => +e);
    }
  };

export default DOMatrix;
