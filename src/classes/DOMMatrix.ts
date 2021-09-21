const DOMatrix =
  window.DOMMatrix ||
  class {
    // eslint-disable-next-line functional/prefer-readonly-type
    a = 1;
    // eslint-disable-next-line functional/prefer-readonly-type
    b = 0;
    // eslint-disable-next-line functional/prefer-readonly-type
    c = 0;
    // eslint-disable-next-line functional/prefer-readonly-type
    d = 1;
    // eslint-disable-next-line functional/prefer-readonly-type
    e = 0;
    // eslint-disable-next-line functional/prefer-readonly-type
    f = 0;
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
      // eslint-disable-next-line functional/no-let
      let { transform }: { readonly transform: string } =
        getComputedStyle(vnode);

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
