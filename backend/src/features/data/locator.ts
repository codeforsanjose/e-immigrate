import path from 'path';
export const ROOT_DATA_DIR = './data';

/**
 *  Get the path of a data file with the given name.
 *
 * @export
 * @param {string} relativePath
 */
export function getFullDataPath(relativePath: string): string {
    return path.join(ROOT_DATA_DIR, relativePath);
}