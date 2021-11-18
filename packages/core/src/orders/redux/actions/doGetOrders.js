import {
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
} from '../actionTypes';
import { getUser } from '../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import order from '../../../entities/schemas/order';
import orderSplitted from '../../../entities/schemas/orderSplitted';

/**
 * @callback GetOrdersThunkFactory
 * @param {object} props - Query parameters to apply for fetching orders.
 * @param {object} [props.splitByMerchantOrderCode] - Optional. Will change how the store is organized.
 * If available every order will be identified by its `merchantOrderCode`, i.e.:
 * order_id -> 'byMerchant' -> merchant_id -> merchant_order_code -> { ... }
 * instead of the default order_id -> 'byMerchant' -> merchant_id -> { ... }.
 * This allows to associate the order items and order merchants and helps
 * to identify in what delivery status those items are currently in, or how returns should be splitted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Get orders.
 *
 * @function doGetOrders
 * @memberof module:orders/actions
 *
 * @param {Function} getOrders - Get orders client.
 *
 * @returns {GetOrdersThunkFactory} Thunk factory.
 */
export default getOrders => (props, config) => async (dispatch, getState) => {
  dispatch({
    type: GET_ORDERS_REQUEST,
  });
  const state = getState();
  const userId = getUser(state)?.id;

  // To prevent breaking changes, the splitByMerchantOrderCode was added.
  // If available every order will be identified by its `merchantOrderCode`, i.e.
  // order_id -> 'byMerchant' -> merchant_id -> merchant_order_code -> { ... }
  // instead of the default order_id -> 'byMerchant' -> merchant_id -> { ... }.
  const args = props?.splitByMerchantOrderCode
    ? [{ query: props?.query, userId }, config]
    : [{ query: props, userId }, config];

  try {
    const result = await getOrders(...args);

    let normalizedOrders;
    if (props?.splitByMerchantOrderCode) {
      normalizedOrders = normalize(result, {
        items: { entries: [orderSplitted] },
      });
    } else {
      normalizedOrders = normalize(result, {
        items: { entries: [order] },
      });
    }

    dispatch({
      meta: { splitByMerchantOrderCode: props?.splitByMerchantOrderCode },
      payload: normalizedOrders,
      type: GET_ORDERS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_ORDERS_FAILURE,
    });

    throw error;
  }
};
