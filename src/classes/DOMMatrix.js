const DOMatrix =
  window.DOMMatrix ||
  window.WebkitDOMMatix ||
  class {
    a = 1;
    b = 0;
    c = 0;
    d = 1;
    e = 0;
    f = 0;
    constructor(css) {
      const vnode = document.createElement("div");
      vnode.style.opacity = 0;
      vnode.style.position = "fixed";
      vnode.style.top = vnode.style.left = -9e99 + "px";
      vnode.style[TRANSFORM_Prop] = css;
      document.documentElement.appendChild(vnode);
      let transform = getComputedStyle(vnode)[TRANSFORM_Prop];

      if (transform == "none") transform = "1, 0, 0, 1, 0, 0";
      transform = transform
        .replace(/^(?:matrix3d|matrix)\(|\s|\)$/g, "")
        .split(",")
        .map((e) => +e);
      document.documentElement.removeChild(vnode);
      transform._isMatrix = true;

      [this.a, this.b, this.c, this.d, this.e, this.f] = transform;
    }
  };

export default DOMatrix;
