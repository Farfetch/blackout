import type { Config } from '../../types/index.js';

export type DeleteSubscription = (
  query: DeleteSubscriptionQuery,
  config?: Config,
) => Promise<void>;

export type DeleteSubscriptionQuery = {
  /**
   * The identifier of the subscription.
   */
  id: string;
  /**
   * SHA256 hash of the user's email to be unsubscribed.
   */
  emailHash: string;
};
