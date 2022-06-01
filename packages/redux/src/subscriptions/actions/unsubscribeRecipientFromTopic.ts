import { deleteRecipientFromTopic } from '@farfetch/blackout-client/subscriptions';
import { unsubscribeRecipientFromTopicFactory } from './factories';

/**
 * Method responsible for unsubscribing all subscriptions that were made for the
 * email hash passed in.
 */
export default unsubscribeRecipientFromTopicFactory(deleteRecipientFromTopic);
