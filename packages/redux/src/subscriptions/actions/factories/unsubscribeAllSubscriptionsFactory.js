import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @function unsubscribeAllSubscriptionsFactory
 * @memberof module:subscriptions/actions/factories
 *
 * @param {Function} deleteSubscriptions - Delete subscriptions client.
 *
 * @returns {UnsubscribeAllSubscriptionsThunkFactory} Thunk factory.
 */
export default deleteSubscriptions => (emailHash, config) => async dispatch => {
  dispatch({
    type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST,
  });

  try {
    await deleteSubscriptions(emailHash, config);

    dispatch({
      type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE,
    });

    throw error;
  }
};
