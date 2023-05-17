import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Method responsible for clearing a specific unsubscribe recipient from topic
 * request state from the redux store.
 *
 * @param recipientId - The id of the recipient (address) whose unsubscribe request state is to be
 *                      removed.
 *
 * @returns Dispatch clear unsubscribe recipient from topic action.
 */
const clearUnsubscribeRecipientFromTopic =
  (recipientId: string) =>
  (dispatch: Dispatch): void => {
    dispatch({
      payload: { recipientId },
      type: actionTypes.CLEAR_UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST,
    });
  };

export default clearUnsubscribeRecipientFromTopic;
