import type { CipherParams } from "../CipherParams";
export interface Formatter {
    stringify: (params: CipherParams) => string;
    parse: (s: string) => CipherParams;
}
