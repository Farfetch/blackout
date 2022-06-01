import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Method responsible for clearing all unsubscribe recipient from topic requests
 * state from the redux store.
 *
 * @returns Dispatch clear all unsubscribe recipient topic action.
 */
const clearAllUnsubscribeRecipientFromTopicRequests =
  () =>
  (dispatch: Dispatch): void => {
    dispatch({
      type: actionTypes.CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS,
    });
  };

export default clearAllUnsubscribeRecipientFromTopicRequests;
