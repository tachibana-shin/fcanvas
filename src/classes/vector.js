function calculateRemainder2D(vector, xComponent, yComponent) {
    if (xComponent !== 0) {
        vector.x = vector.x % xComponent;
    }
    if (yComponent !== 0) {
        vector.y = vector.y % yComponent;
    }
    return vector;
}
function calculateRemainder3D(vector, xComponent, yComponent, zComponent) {
    if (xComponent !== 0) {
        vector.x = vector.x % xComponent;
    }
    if (yComponent !== 0) {
        vector.y = vector.y % yComponent;
    }
    if (zComponent !== 0) {
        vector.z = vector.z % zComponent;
    }
    return vector;
}
export default class Vector {
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=0} z
     * @return {any}
     */
    constructor(x = 0, y = 0, z = 0) {
        [this.x, this.y, this.z] = [x, y, z];
    }
    /**
     * @param {Vector|[number?} x?
     * @param {any} number?
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {this}
     */
    set(x, y, z) {
        if (x instanceof Vector) {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
            this.z = x[2] || 0;
            return this;
        }
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        return this;
    }
    /**
     * @return {Vector}
     */
    copy() {
        return new Vector(this.x, this.y, this.z);
    }
    /**
     * @param {Vector|[number?} x?
     * @param {any} number?
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {this}
     */
    add(x, y, z) {
        if (x instanceof Vector) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            this.z += x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x += x[0] || 0;
            this.y += x[1] || 0;
            this.z += x[2] || 0;
            return this;
        }
        this.x += x || 0;
        this.y += y || 0;
        this.z += z || 0;
        return this;
    }
    /**
     * @param {Vector|[number} x?
     * @param {any} number
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {any}
     */
    rem(x, y, z) {
        if (x instanceof Vector) {
            if (Number.isFinite(x.x) &&
                Number.isFinite(x.y) &&
                Number.isFinite(x.z)) {
                var xComponent = parseFloat(x.x + "");
                var yComponent = parseFloat(x.y + "");
                var zComponent = parseFloat(x.z + "");
                calculateRemainder3D(this, xComponent, yComponent, zComponent);
            }
        }
        else if (x instanceof Array) {
            if (x.every(function (element) {
                return Number.isFinite(element);
            })) {
                if (x.length === 2) {
                    calculateRemainder2D(this, x[0], x[1]);
                }
                if (x.length === 3) {
                    calculateRemainder3D(this, x[0], x[1], x[2] || 0);
                }
            }
        }
        else if (arguments.length === 1) {
            if (Number.isFinite(arguments[0]) && arguments[0] !== 0) {
                this.x = this.x % arguments[0];
                this.y = this.y % arguments[0];
                this.z = this.z % arguments[0];
                return this;
            }
        }
        else if (arguments.length === 2) {
            var vectorComponents = [].slice.call(arguments);
            if (vectorComponents.every(function (element) {
                return Number.isFinite(element);
            })) {
                if (vectorComponents.length === 2) {
                    calculateRemainder2D(this, vectorComponents[0], vectorComponents[1]);
                }
            }
        }
        else if (arguments.length === 3) {
            var _vectorComponents = [].slice.call(arguments);
            if (_vectorComponents.every(function (element) {
                return Number.isFinite(element);
            })) {
                if (_vectorComponents.length === 3) {
                    calculateRemainder3D(this, _vectorComponents[0], _vectorComponents[1], _vectorComponents[2]);
                }
            }
        }
    }
    /**
     * @param {Vector|[number?} x?
     * @param {any} number?
     * @param {any} number?]|number
     * @param {number} y?
     * @param {number} z?
     * @return {this}
     */
    sub(x, y, z) {
        if (x instanceof Vector) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            this.z -= x.z || 0;
            return this;
        }
        if (x instanceof Array) {
            this.x -= x[0] || 0;
            this.y -= x[1] || 0;
            this.z -= x[2] || 0;
            return this;
        }
        this.x -= x || 0;
        this.y -= y || 0;
        this.z -= z || 0;
        return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */
    mult(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
        return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */
    div(n) {
        if (n === 0) {
            console.warn("div:", "divide by 0");
            return this;
        }
        this.x /= n;
        this.y /= n;
        this.z /= n;
        return this;
    }
    /**
     * @return {number}
     */
    mag() {
        return Math.sqrt(this.magSq());
    }
    /**
     * @return {number}
     */
    magSq() {
        const { x, y, z } = this;
        return x * x + y * y + z * z;
    }
    /**
     * @param {Vector|number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {number}
     */
    dot(x, y, z) {
        if (x instanceof Vector) {
            return this.dot(x.x, x.y, x.z);
        }
        return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
    }
    /**
     * @param {Vector|{x:number;y:number;z:number}} v
     * @return {Vector}
     */
    cross(v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;
        return new Vector(x, y, z);
    }
    /**
     * @return {this}
     */
    normalize() {
        const len = this.mag();
        if (len !== 0)
            this.mult(1 / len);
        return this;
    }
    /**
     * @param {number} max
     * @return {this}
     */
    limit(max) {
        const mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)) //normalize it
                .mult(max);
        }
        return this;
    }
    /**
     * @param {number} n
     * @return {this}
     */
    setMag(n) {
        return this.normalize().mult(n);
    }
    /**
     * @return {number}
     */
    heading() {
        return Math.atan2(this.y, this.x);
    }
    /**
     * @param {number} a
     * @return {this}
     */
    rotate(a) {
        var newHeading = this.heading() + a;
        var mag = this.mag();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;
        return this;
    }
    /**
     * @param {Vector} v
     * @return {number}
     */
    angleBetween(v) {
        var dotmagmag = this.dot(v) / (this.mag() * v.mag());
        var angle;
        angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        angle = angle * Math.sign(this.cross(v).z || 1);
        return angle;
    }
    /**
     * @param {Vector|number} x
     * @param {number} y?
     * @param {number} z?
     * @param {number=1} amt
     * @return {this}
     */
    lerp(x, y, z, amt = 1) {
        if (x instanceof Vector) {
            return this.lerp(x.x, x.y, x.z, y || 0);
        }
        this.x += (x - this.x) * amt || 0;
        this.y += (y || 0 - this.y) * amt || 0;
        this.z += (z || 0 - this.z) * amt || 0;
        return this;
    }
    /**
     * @param {Vector} surfaceNormal
     * @return {this}
     */
    reflect(surfaceNormal) {
        surfaceNormal.normalize();
        return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }
    /**
     * @return {[number, number, number]}
     */
    array() {
        return [this.x || 0, this.y || 0, this.z || 0];
    }
    /**
     * @param {Vector|[number} x
     * @param {any} number
     * @param {any} number]|number
     * @param {number} y?
     * @param {number} z?
     * @return {boolean}
     */
    equals(x, y, z) {
        var a, b, c;
        if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
            c = x.z || 0;
        }
        else if (x instanceof Array) {
            a = x[0] || 0;
            b = x[1] || 0;
            c = x[2] || 0;
        }
        else {
            a = x || 0;
            b = y || 0;
            c = z || 0;
        }
        return this.x === a && this.y === b && this.z === c;
    }
    /**
     * @return {string}
     */
    toString() {
        return "Vector: [" + this.array().join(", ") + "]";
    }
}
