import * as actionTypes from '../../actionTypes';
import {
  DeleteSubscriptionTopicRecipient,
  toBlackoutError,
} from '@farfetch/blackout-client';
import type { UnsubscribeSubscriptionTopicRecipientFactory } from './types';

/**
 * Method to create a thunk factory configured with the specified client.
 *
 * @param deleteSubscriptionTopicRecipient - Delete subscription topic recipient client.
 *
 * @returns Thunk factory.
 */
const unsubscribeSubscriptionTopicRecipient: UnsubscribeSubscriptionTopicRecipientFactory<
  DeleteSubscriptionTopicRecipient
> =
  deleteSubscriptionTopicRecipient =>
  (subscriptionId, topicId, recipientId, meta, config) =>
  async dispatch => {
    try {
      dispatch({
        type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST,
        payload: {
          subscriptionId,
          topicId,
          recipientId,
        },
        meta,
      });

      const result = await deleteSubscriptionTopicRecipient(
        subscriptionId,
        topicId,
        recipientId,
        config,
      );

      dispatch({
        payload: {
          recipientId,
        },
        type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { recipientId, error: toBlackoutError(error) },
        type: actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FAILURE,
      });

      throw error;
    }
  };

export default unsubscribeSubscriptionTopicRecipient;
