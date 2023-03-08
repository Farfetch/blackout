import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for clearing all unsubscribe recipient from topic requests
 * state from the redux store.
 *
 * @returns Dispatch clear all unsubscribe recipient topic action.
 */
const clearAllUnsubscribeRecipientFromTopic =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.CLEAR_ALL_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FROM_REQUESTS,
    });
  };

export default clearAllUnsubscribeRecipientFromTopic;
