import { Cipher, CipherProps, PropsWithKey } from "./Cipher";
import type { BlockCipherMode, BlockCipherModeProps } from "./mode/BlockCipherMode";
import type { Pad } from "./pad/type";
import type { Word32Array } from "../../Word32Array";
import type { BaseKDFModule } from "./kdf/type";
import type { Hasher } from "../Hasher";
export interface BlockCipherProps extends CipherProps {
    mode: typeof BlockCipherMode;
    padding: Pad;
    kdfSalt: Word32Array;
    kdfModule: typeof BaseKDFModule;
    kdfHasher: typeof Hasher;
    kdfIterations: number;
}
export declare class BlockCipher extends Cipher {
    protected _props: PropsWithKey<BlockCipherProps>;
    protected _blockSize: number;
    protected _Mode: typeof BlockCipherMode;
    protected _mode?: BlockCipherMode;
    protected _padding: Pad;
    protected _modeCreator?: (props: BlockCipherModeProps) => BlockCipherMode;
    /**
     * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
     */
    ["constructor"]: typeof BlockCipher;
    constructor(props: PropsWithKey<BlockCipherProps>);
    get mode(): BlockCipherMode | undefined;
    get padding(): Pad;
    reset(data?: Word32Array, nBytes?: number): void;
    protected _doProcessBlock(words: number[], offset: number): void;
    protected _doFinalize(): Word32Array;
    /**
     * @abstract
     */
    encryptBlock(words: number[], offset: number): void;
    /**
     * @abstract
     */
    decryptBlock(words: number[], offset: number): void;
    /**
     * Creates this cipher in encryption mode.
     *
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *     var cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    static createEncryptor(key: Word32Array, props?: Partial<BlockCipherProps>): BlockCipher;
    /**
     * Creates this cipher in decryption mode.
     * @param {Word32Array} key The key.
     * @param {Partial<CipherProps>?} props (Optional) The configuration options to use for this operation.
     * @return {Cipher} A cipher instance.
     * @example
     *   var cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    static createDecryptor(key: Word32Array, props?: Partial<BlockCipherProps>): BlockCipher;
}
