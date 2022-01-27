/**
 * Subscriptions clients.
 *
 * @module subscriptions/client
 * @category Subscriptions
 * @subcategory Clients
 */

import { warnDeprecatedMethod } from '../../helpers';

export { default as putSubscriptions } from './putSubscriptions';
export { default as getSubscriptions } from './getSubscriptions';
export { default as getSubscriptionPackages } from './getSubscriptionPackages';
export { default as deleteSubscriptions } from './deleteSubscriptions';
export { default as deleteRecipientFromTopic } from './deleteRecipientFromTopic';
export { default as deleteSubscription } from './deleteSubscription';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/subscriptions/client',
  '@farfetch/blackout-core/subscriptions',
);
