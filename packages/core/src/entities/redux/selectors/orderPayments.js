import { getEntity } from './entity';

/**
 * Returns an order payment by its id.
 *
 * @function getOrderPayments
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} orderId - Order id.
 *
 * @returns {object} Payment result.
 */
export const getOrderPayments = (state, orderId) =>
  getEntity(state, 'orderPayments', orderId);
