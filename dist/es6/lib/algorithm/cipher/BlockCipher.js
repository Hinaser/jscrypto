import { Cipher } from "./Cipher";
import { CBC } from "./mode/CBC";
import { Pkcs7 } from "./pad/Pkcs7";
export class BlockCipher extends Cipher {
    constructor(props) {
        super(props);
        this._blockSize = 128 / 32;
        this._Mode = CBC;
        this._padding = Pkcs7;
        this._props = props;
        this._Mode = typeof props.mode !== "undefined" ? props.mode : this._Mode;
        this._padding = typeof props.padding !== "undefined" ? props.padding : this._padding;
        this.reset(props === null || props === void 0 ? void 0 : props.data, props === null || props === void 0 ? void 0 : props.nBytes);
    }
    get mode() {
        return this._mode;
    }
    get padding() {
        return this._padding;
    }
    reset(data, nBytes) {
        super.reset(data, nBytes);
        let modeCreator;
        if (this._transformMode === Cipher.ENC_TRANSFORM_MODE) {
            modeCreator = this._Mode.createEncryptor;
        }
        else {
            modeCreator = this._Mode.createDecryptor;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
        }
        if (this._Mode && this._modeCreator === modeCreator) {
            this._mode = new this._Mode({ cipher: this, iv: this._iv });
        }
        else {
            this._mode = modeCreator.call(this._Mode, { cipher: this, iv: this._iv });
            this._modeCreator = modeCreator;
        }
    }
    _doProcessBlock(words, offset) {
        var _a;
        (_a = this._mode) === null || _a === void 0 ? void 0 : _a.processBlock(words, offset);
    }
    _doFinalize() {
        let finalProcessedBlocks;
        // Shortcut
        const padding = this._padding;
        // Finalize
        if (this._transformMode === Cipher.ENC_TRANSFORM_MODE) {
            // Pad data
            padding.pad(this._data, this.blockSize);
            // Process final blocks
            finalProcessedBlocks = this._process(true);
        }
        else /* if (this._transformMode == Cipher._DEC_TRANSFORM_MODE) */ {
            // Process final blocks
            finalProcessedBlocks = this._process(true);
            // Unpad data
            padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
    }
    /**
     * @abstract
     */
    encryptBlock(words, offset) {
        throw new Error("Not implemented");
    }
    /**
     * @abstract
     */
    decryptBlock(words, offset) {
        throw new Error("Not implemented");
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new BlockCipher(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.ENC_TRANSFORM_MODE }));
    }
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key, props) {
        props = typeof props === "undefined" ? {} : props;
        return new BlockCipher(Object.assign(Object.assign({}, props), { key, transformMode: Cipher.DEC_TRANSFORM_MODE }));
    }
}
