import * as actionTypes from '../../actionTypes';
import {
  DeleteRecipientFromTopic,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { UnsubscribeRecipientFromTopicFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param deleteRecipientFromTopic - Delete recipient from subscription topic client.
 *
 * @returns Thunk factory.
 */
const unsubscribeRecipientFromTopicFactory: UnsubscribeRecipientFromTopicFactory<
  DeleteRecipientFromTopic
> =
  deleteRecipientFromTopic =>
  (subscriptionId, topicId, recipientId, meta, config) =>
  async dispatch => {
    try {
      dispatch({
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST,
        payload: {
          subscriptionId,
          topicId,
          recipientId,
        },
        meta,
      });

      const result = await deleteRecipientFromTopic(
        subscriptionId,
        topicId,
        recipientId,
        config,
      );

      dispatch({
        payload: {
          recipientId,
        },
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { recipientId, error: toBlackoutError(error) },
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
      });

      throw error;
    }
  };

export default unsubscribeRecipientFromTopicFactory;
