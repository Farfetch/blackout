import { CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST } from '../actionTypes';

/**
 * Method responsible for clearing a specific unsubscribe recipient from topic request state from the redux store.
 *
 * @function clearUnsubscribeRecipientFromTopicRequest
 * @memberof module:subscriptions/actions
 *
 * @param {string} recipientId - The id of the recipient (address) whose unsubscribe request state is to be removed.
 *
 * @returns {Function} Thunk factory.
 */
export default recipientId => dispatch => {
  dispatch({
    payload: { recipientId },
    type: CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
  });
};
