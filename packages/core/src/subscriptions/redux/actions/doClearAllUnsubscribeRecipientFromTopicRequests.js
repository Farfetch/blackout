import { CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS } from '../actionTypes';

/**
 * Method responsible for clearing all unsubscribe recipient from topic requests state from the redux store.
 *
 * @function doClearAllUnsubscribeRecipientFromTopicRequests
 * @memberof module:subscriptions/actions
 *
 * @returns {Function} Thunk factory.
 */
export default () => dispatch => {
  dispatch({
    type: CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
  });
};
