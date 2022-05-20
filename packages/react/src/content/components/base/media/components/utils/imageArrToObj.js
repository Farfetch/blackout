/**
 * Passing an array of images to an object.
 *
 * @param {*[]} array - Image with an array of elements.
 *
 * @returns {object[]} - Object with the sources grouped by size.
 */
export default array => {
  if (!array) {
    return undefined;
  }

  return array.reduce((obj, item) => {
    obj[item.size] = item.source;
    return obj;
  }, {});
};
