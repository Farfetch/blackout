import type {
  Config,
  DeleteSubscriptionTopicRecipient,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UnsubscribeSubscriptionTopicRecipientAction } from '../../../types';

export type UnsubscribeSubscriptionTopicRecipientFactory<
  T extends DeleteSubscriptionTopicRecipient,
> = (deleteRecipientFromTopic: T) => (
  /**
   * Id of the subscription to be affected.
   */
  subscriptionId: string,
  /**
   * Id of topic to remove the recipient from.
   */
  topicId: string,
  /**
   * The id of the recipient to be removed.
   */
  recipientId: string,
  /**
   * Additional metadata to action.
   */
  meta?: UnsubscribeSubscriptionTopicRecipientMeta,
  config?: Config,
) => (
  dispatch: Dispatch<UnsubscribeSubscriptionTopicRecipientAction>,
) => ReturnType<T>;

export type UnsubscribeSubscriptionTopicRecipientMeta = {
  trackRequestState: boolean;
} & Record<string, unknown>;
