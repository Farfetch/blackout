import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

const omitSize = object => omit(object, ['size']);

/**
 * Compares two bag items to see if they are identical.
 * They are considered identical if they have the same product id and the same custom attributes (except their size).
 *
 * @function areBagItemsIdentical
 * @memberof module:bags/utils
 *
 * @param  {object} item1 - The first item.
 * @param  {object} item2 - The second item.
 *
 * @returns {boolean} True only if the items are identical.
 */
export default (item1, item2) => {
  return (
    item1.id !== item2.id &&
    item1.product.id === item2.product.id &&
    isEqual(
      omitSize(item1.product.customAttributes),
      omitSize(item2.product.customAttributes),
    )
  );
};
