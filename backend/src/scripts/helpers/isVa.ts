import { Row } from "read-excel-file";
import { ArrayElementOf } from "../../types/ArrayElementOf.js";
import { Cell } from "read-excel-file/types.js";

// type Cell = (ArrayElementOf<Row>) & (string | number);

export function isValidRecordCell(value: Cell): value is (string | number) {
    return typeof value === 'string' || typeof value === 'number';
}