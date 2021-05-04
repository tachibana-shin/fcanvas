const DOMatrix = window.DOMMatrix ||
    class {
        constructor(css) {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
            const vnode = document.createElement("div");
            vnode.style.opacity = "0";
            vnode.style.position = "fixed";
            vnode.style.top = vnode.style.left = -9e99 + "px";
            vnode.style.transform = css;
            document.documentElement.appendChild(vnode);
            let { transform } = getComputedStyle(vnode);
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
