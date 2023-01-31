import get from 'lodash/get';
import orderBy from 'lodash/orderBy';
import warnDeprecatedMethod from './warnDeprecatedMethod';

/**
 * Gets all labels of a given product, sorted by the given priority order.
 * If your order is ascending, the labels are presented from high priority to low priority, ie, from 1 to infinity.
 * A lower number means a higher priority (between a priority of 1 and 10, 1 has higher priority), and vice-versa.
 *
 * @memberof helpers
 *
 * @param {object} product - Product object.
 * @param {string} [order='asc'] - Sorting order; can be 'asc' or 'desc'.
 *
 * @returns {Array} Labels sorted by the given order.
 */
const sortProductLabelsByPriority = (product, order = 'asc') => {
  warnDeprecatedMethod(
    '@farfetch/blackout-core/helpers',
    'sortProductLabelsByPriority',
  );

  const labels = get(product, 'labels');

  return orderBy(labels, 'priority', order);
};

export default sortProductLabelsByPriority;
