import type { Config } from '../../types';

export type DeleteRecipientFromTopic = (
  /** Id of the subscription to be affected. */
  subscriptionId: string,
  /** Id of topic to remove the recipient from. */
  topicId: string,
  /** The id of the recipient to be removed. */
  recipientId: string,
  config?: Config,
) => Promise<void>;
