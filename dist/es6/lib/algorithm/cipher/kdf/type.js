export class BaseKDFModule {
    constructor(props) {
        this._props = props;
    }
    compute(password, salt) {
        throw new Error("Not implemented");
    }
    static getKey(password, salt, props) {
        throw new Error("Not implemented");
    }
}
