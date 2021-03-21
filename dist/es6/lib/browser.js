const ua = typeof navigator !== "undefined" && navigator.userAgent ? navigator.userAgent.toLowerCase() : "";
const IEVer = (() => {
    let ver = parseInt((/msie (\d+)/.exec(ua) || [])[1], 10);
    if (isNaN(ver)) {
        ver = parseInt((/trident\/.*; rv:(\d+)/.exec(ua) || [])[1], 10);
        if (isNaN(ver)) {
            return false;
        }
        return ver;
    }
    return ver;
})();
export function isIE(op, ver) {
    if (IEVer === false)
        return false;
    if (!ver)
        return true;
    if (op === "<")
        return IEVer < ver;
    if (op === "<=")
        return IEVer <= ver;
    if (op === ">")
        return IEVer > ver;
    if (op === ">=")
        return IEVer >= ver;
    if (op === "=")
        return IEVer === ver;
    return IEVer === ver;
}
