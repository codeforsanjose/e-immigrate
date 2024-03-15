const A_IS_SMALLER = -1;
const B_IS_SMALLER = 1;
const BOTH_ARE_SAME = 0;
export function defaultCompare<T>(a: T, b: T): number {
  if (a == null && b == null) return BOTH_ARE_SAME;
  else if (b == null) return B_IS_SMALLER;
  else if (a == null) return A_IS_SMALLER;
  else if (typeof a !== typeof b) return A_IS_SMALLER;
  else if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) return A_IS_SMALLER;
    else if (b < a) return B_IS_SMALLER;
    return BOTH_ARE_SAME;
  }
  else if (typeof a === 'string' && typeof b === 'string') {
    if (a < b) return A_IS_SMALLER;
    else if (b < a) return B_IS_SMALLER;
    return BOTH_ARE_SAME;
  }
  return A_IS_SMALLER;
}