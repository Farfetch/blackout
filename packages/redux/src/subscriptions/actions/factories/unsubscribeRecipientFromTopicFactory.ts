import * as actionTypes from '../../actionTypes';
import { toError } from '@farfetch/blackout-client/helpers/client';
import type { DeleteRecipientFromTopic } from '@farfetch/blackout-client/subscriptions/types';
import type { UnsubscribeRecipientFromTopicFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param deleteRecipientFromTopic - Delete recipient from subscription topic client.
 *
 * @returns Thunk factory.
 */
const unsubscribeRecipientFromTopic: UnsubscribeRecipientFromTopicFactory<
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

      await deleteRecipientFromTopic(
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
    } catch (error) {
      dispatch({
        payload: { recipientId, error: toError(error) },
        type: actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE,
      });

      throw error;
    }
  };

export default unsubscribeRecipientFromTopic;
