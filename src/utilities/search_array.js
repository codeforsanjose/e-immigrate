import Fuse from 'fuse.js';
/**
 * search through an arary of objects for a specifed search string
 * objects-array of objects to be filterd
 * propertyPath - property to be filtered on, can include sub objects
 * searchText - text to search for
 * minLength - min length of the match
 * @returns the filtered responses from the array
 */
export const searchArrayObjects = (
    objects,
    propertyPath,
    searchText,
    minLength = 3
) => {
    if (!searchText) {
        return objects;
    }
    const fuse = new Fuse(objects, {
        keys: [propertyPath],
        minMatchCharLength: minLength,
    });
    const filterResponse = fuse.search(searchText).map((result) => result.item);
    return filterResponse;
};
