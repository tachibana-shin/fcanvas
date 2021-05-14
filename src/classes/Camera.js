import { constrain } from "../methods/index";
class Camera {
    /**
     * @param {number|Viewport|Config} width
     * @param {number|ViewBox} height?
     * @param {number|Cursor|false} x?
     * @param {number} y?
     * @param {number} vWidth?
     * @param {number} vHeight?
     * @param {number|false} cix?
     * @param {number} ciy?
     * @param {number} cwidth?
     * @param {number} cheight?
     * @return {any}
     */
    constructor(width, height, x, y, vWidth, vHeight, cix, ciy, cwidth, cheight) {
        this.viewport = {
            width: 0,
            height: 0,
        }; /// view port 100% frame
        this.viewBox = {
            mx: 0,
            my: 0,
            width: 0,
            height: 0,
        }; /// view box for full canvas
        this._cx = 0; /// x camera
        this._cy = 0; /// y camera
        this.cursor = {
            __camera: this,
            use: true,
            idealX: 0,
            idealY: 0,
            offsetTop: 0,
            offsetRight: 0,
            offsetBottom: 0,
            offsetLeft: 0,
            width: 0,
            height: 0,
            get x() {
                if (this.__camera._cx < -this.__camera.viewBox.mx) {
                    const dx = -this.__camera.viewBox.mx - this.__camera._cx;
                    return this.idealX - dx;
                }
                if (this.__camera._cx >
                    this.__camera.viewport.width - this.__camera.viewBox.width) {
                    const dx = this.__camera.viewport.width -
                        this.__camera.viewBox.width -
                        this.__camera._cx;
                    return this.idealX - dx;
                }
                return this.idealX;
            },
            set x(x) {
                if (x < this.idealX) {
                    this.__camera._cx = x - this.idealX - this.__camera.viewBox.mx;
                }
                if (x > this.idealX) {
                    this.__camera._cx =
                        x -
                            this.idealX +
                            this.__camera.viewport.width -
                            this.__camera.viewBox.width -
                            this.width;
                }
            },
            get y() {
                if (this.__camera._cy < -this.__camera.viewBox.my) {
                    const dy = -this.__camera.viewBox.my - this.__camera._cy;
                    return this.idealY - dy;
                }
                if (this.__camera._cy >
                    this.__camera.viewport.height - this.__camera.viewBox.height) {
                    const dy = this.__camera.viewport.height -
                        this.__camera.viewBox.height -
                        this.__camera._cy;
                    return this.idealY - dy;
                }
                return this.idealY;
            },
            set y(y) {
                if (y < this.idealY) {
                    this.__camera._cy = y - this.idealY - this.__camera.viewBox.my;
                }
                if (y > this.idealY) {
                    this.__camera._cy =
                        y -
                            this.idealY +
                            this.__camera.viewport.height -
                            this.__camera.viewBox.height -
                            this.height;
                }
            },
        };
        switch (arguments.length) {
            case 1:
                const { viewport, viewBox, cursor } = width;
                this.setViewport(viewport);
                this.setViewBox(viewBox);
                this.setCursor(cursor);
                break;
            case 2:
                this.setViewport(width);
                this.setViewBox(height);
                this.setCursor(x);
                break;
            default:
                this.setViewport(width || 0, height || 0);
                this.setViewBox(x || 0, y || 0, vWidth || 0, vHeight || 0);
                if (cix === false) {
                    this.setCursor(false);
                }
                else {
                    this.setCursor(cix, ciy, cwidth, cheight);
                }
        }
    }
    get cx() {
        return this._cx;
    }
    set cx(x) {
        if (this.cursor.use) {
            this._cx = constrain(x, -this.cursor.idealX - this.viewBox.mx - this.cursor.offsetLeft, this.viewport.width -
                this.viewBox.width +
                (this.viewBox.width - this.cursor.idealX - this.cursor.width) +
                this.cursor.offsetRight);
        }
        else {
            this._cx = constrain(x, -this.viewBox.mx, this.viewport.width - this.viewBox.width);
        }
    }
    get cy() {
        return this._cy;
    }
    set cy(y) {
        if (this.cursor.use) {
            this._cy = constrain(y, -this.cursor.idealY - this.viewBox.my - this.cursor.offsetTop, this.viewport.height -
                this.viewBox.height +
                (this.viewBox.height - this.cursor.idealY - this.cursor.height) +
                this.cursor.offsetBottom);
        }
        else {
            this._cy = constrain(y, -this.viewBox.my, this.viewport.height - this.viewBox.height);
        }
    }
    /**
     * @param {Viewport|number} width
     * @param {number} height?
     * @return {void}
     */
    setViewport(width, height) {
        if (height === null) {
            this.viewport.width = width.width || 0;
            this.viewport.height = width.height || 0;
        }
        else {
            this.viewport.width = width;
            this.viewport.height = height;
        }
    }
    /**
     * @param {ViewBox|number} x
     * @param {number} y?
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */
    setViewBox(x, y, width, height) {
        if (arguments.length === 1) {
            this.viewBox.mx = x.mx || 0;
            this.viewBox.my = x.my || 0;
            this.viewBox.width = x.width || 0;
            this.viewBox.height = x.height || 0;
        }
        else {
            this.viewBox.mx = x || 0;
            this.viewBox.my = y || 0;
            this.viewBox.width = width || 0;
            this.viewBox.height = height || 0;
        }
    }
    /**
     * @param {number|CursorOffset|false} idealX
     * @param {number} idealY?
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */
    setCursor(idealX, idealY, width, height) {
        if (arguments.length === 1) {
            if (idealX === false) {
                this.cursor.use = false;
            }
            else {
                this.cursor.idealX = idealX.idealX || 0;
                this.cursor.idealY = idealX.idealY || 0;
                this.cursor.width = idealX.width || 0;
                this.cursor.height = idealX.height || 0;
            }
        }
        else {
            this.cursor.idealX = idealX || 0;
            this.cursor.idealY = idealY || 0;
            this.cursor.width = width || 0;
            this.cursor.height = height || 0;
        }
    }
    /**
     * @param {number} x
     * @return {number}
     */
    followX(x) {
        return (x -
            constrain(this._cx, -this.viewBox.mx, this.viewport.width - this.viewBox.width));
    }
    /**
     * @param {number} y
     * @return {number}
     */
    followY(y) {
        return (y -
            constrain(this._cy, -this.viewBox.my, this.viewport.height - this.viewBox.height));
    }
    /**
     * @param {Vector} vector
     * @return {Vector}
     */
    followVector(vector) {
        return vector.set(this.followX(vector.x), this.followY(vector.y));
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {any}
     */
    follow(x, y) {
        return {
            x: this.followX(x),
            y: this.followY(y),
        };
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @return {boolean}
     */
    inViewBox(x, y, width = 0, height = 0) {
        x = this.followX(x);
        y = this.followY(y);
        if (this.viewBox.mx <= x &&
            this.viewBox.my <= y &&
            this.viewBox.mx + this.viewBox.width >= x + width &&
            this.viewBox.my + this.viewBox.height >= y + height) {
            return true;
        }
        return false;
    }
}
export default Camera;
