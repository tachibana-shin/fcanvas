declare const DOMatrix: {
    new (init?: string | number[] | undefined): DOMMatrix;
    prototype: DOMMatrix;
    fromFloat32Array(array32: Float32Array): DOMMatrix;
    fromFloat64Array(array64: Float64Array): DOMMatrix;
    fromMatrix(other?: DOMMatrixInit | undefined): DOMMatrix;
};
export default DOMatrix;
