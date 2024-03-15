import { type HbsptGlobal } from "./types";

export function getHbspt(): HbsptGlobal | undefined {
    if (!('hbspt' in window)) return;
    return window.hbspt as HbsptGlobal;
}