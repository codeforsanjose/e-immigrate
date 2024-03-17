import path from 'path';
export const ROOT_DATA_DIR = './data';
export function getFullDataPath(relativePath: string) {
    return path.join(ROOT_DATA_DIR, relativePath);
}