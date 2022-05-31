/**
 * Passing an array of images to an object.
 *
 * @param array - Image with an array of elements.
 *
 * @returns - Object with the sources grouped by size.
 */

import type { Assets } from '../../../../../types/base.types';

const imageArrToObj = (array: Array<Assets>) => {
  if (!array) {
    return undefined;
  }

  return array.reduce((obj, item) => {
    obj[item.size] = item.source;
    return obj;
  }, {} as Record<string, string>);
};

export default imageArrToObj;
