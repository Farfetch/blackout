import { deleteSubscriptionTopicRecipient } from '@farfetch/blackout-client';
import { unsubscribeSubscriptionTopicRecipientFactory } from './factories';

/**
 * Method responsible for unsubscribing a subscription topic recipient.
 */
export default unsubscribeSubscriptionTopicRecipientFactory(
  deleteSubscriptionTopicRecipient,
);
