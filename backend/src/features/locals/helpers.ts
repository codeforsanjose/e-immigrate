import { Response } from "express";


export function setResponseLocalsValue(res: Response, key: string, value: unknown) {
  res.locals[key] = value;
}

type FullResponseLocalsValueContainer =
| { key: 'NOT_FOUND', }
| { key: 'FOUND', value: unknown, };

/**
 *  Get the value from the full value wrapper.
 * NOTE: the result of this function returns
 * undefined when EITHER key wasnt found OR 
 * the actual value is undefined.
 * 
 * @export
 * @param {FullResponseLocalsValueContainer} container
 * @returns {(unknown | undefined)}
 */
export function getValueFromLocalsContainer(container: FullResponseLocalsValueContainer): unknown | undefined {
  if (container.key === 'NOT_FOUND') return undefined;
  return container.value;
}



export function getFullResponseLocalsValue(res: Response, key: string): FullResponseLocalsValueContainer {
  if (res.locals == null) return { key: 'NOT_FOUND' };
  else if (!(key in res.locals)) return { key: 'NOT_FOUND' };
  const value = res.locals[key];
  return {
    key: 'FOUND',
    value,
  };
}

/**
 *  Get the value of the response local with the given key.
 * NOTE: the result of this function returns
 * undefined when EITHER key wasnt found OR 
 * the actual value is undefined.
 * @export
 * @param {Response} res
 * @param {string} key
 * @returns {(unknown | undefined)}
 */
export function tryGetResponseLocalsValue<T = unknown>(res: Response, key: string): undefined | T {
  const fullResult = getFullResponseLocalsValue(res, key);
  return getValueFromLocalsContainer(fullResult) as T;
}
