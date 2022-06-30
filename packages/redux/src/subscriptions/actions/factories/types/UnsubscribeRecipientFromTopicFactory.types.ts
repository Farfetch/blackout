import type {
  Config,
  DeleteRecipientFromTopic,
} from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { UnsubscribeRecipientFromTopicAction } from '../../../types';

export type UnsubscribeRecipientFromTopicFactory<
  T extends DeleteRecipientFromTopic,
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
  meta?: UnsubscribeRecipientFromTopicMeta,
  config?: Config,
) => (dispatch: Dispatch<UnsubscribeRecipientFromTopicAction>) => ReturnType<T>;

export type UnsubscribeRecipientFromTopicMeta = {
  trackRequestState: boolean;
} & Record<string, unknown>;
