/**
 *   A utility type to extract an array's element type.
 */
export type ArrayElementOf<T> = 
  T extends Array<infer I> 
    ? I 
    : (T extends ReadonlyArray<infer I> ? I : never);