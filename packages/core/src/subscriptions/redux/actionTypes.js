/**
 * @module subscriptions/actionTypes
 * @category Subscriptions
 * @subcategory Actions
 */

/** Action type dispatched when the get subscription packages request fails. */
export const GET_SUBSCRIPTION_PACKAGES_FAILURE =
  '@farfetch/blackout-core/GET_SUBSCRIPTION_PACKAGES_FAILURE';
/** Action type dispatched when the get subscription packages request starts. */
export const GET_SUBSCRIPTION_PACKAGES_REQUEST =
  '@farfetch/blackout-core/GET_SUBSCRIPTION_PACKAGES_REQUEST';
/** Action type dispatched when the get subscription packages request succeeds. */
export const GET_SUBSCRIPTION_PACKAGES_SUCCESS =
  '@farfetch/blackout-core/GET_SUBSCRIPTION_PACKAGES_SUCCESS';

/** Action type dispatched when the get user subscriptions request fails. */
export const GET_USER_SUBSCRIPTIONS_FAILURE =
  '@farfetch/blackout-core/GET_USER_SUBSCRIPTIONS_FAILURE';
/** Action type dispatched when the get user subscriptions request starts. */
export const GET_USER_SUBSCRIPTIONS_REQUEST =
  '@farfetch/blackout-core/GET_USER_SUBSCRIPTIONS_REQUEST';
/** Action type dispatched when the get user subscriptions request succeeds. */
export const GET_USER_SUBSCRIPTIONS_SUCCESS =
  '@farfetch/blackout-core/GET_USER_SUBSCRIPTIONS_SUCCESS';

/** Action type dispatched when the put user subscriptions request fails. */
export const PUT_USER_SUBSCRIPTIONS_FAILURE =
  '@farfetch/blackout-core/PUT_USER_SUBSCRIPTIONS_FAILURE';
/** Action type dispatched when the put user subscriptions request starts. */
export const PUT_USER_SUBSCRIPTIONS_REQUEST =
  '@farfetch/blackout-core/PUT_USER_SUBSCRIPTIONS_REQUEST';
/** Action type dispatched when the put user subscriptions request succeeds. */
export const PUT_USER_SUBSCRIPTIONS_SUCCESS =
  '@farfetch/blackout-core/PUT_USER_SUBSCRIPTIONS_SUCCESS';

/** Action type dispatched by [reset]{@link module:subscriptions/actions.reset} thunk. */
export const RESET_SUBSCRIPTIONS =
  '@farfetch/blackout-core/RESET_SUBSCRIPTIONS';

/** Action type dispatched when the unsubscribe all subscriptions request fails. */
export const UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE =
  '@farfetch/blackout-core/UNSUBSCRIBE_ALL_SUBSCRIPTIONS_FAILURE';
/** Action type dispatched when the unsubscribe all subscriptions request starts. */
export const UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST =
  '@farfetch/blackout-core/UNSUBSCRIBE_ALL_SUBSCRIPTIONS_REQUEST';
/** Action type dispatched when the unsubscribe all subscriptions request succeeds. */
export const UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS =
  '@farfetch/blackout-core/UNSUBSCRIBE_ALL_SUBSCRIPTIONS_SUCCESS';

/** Action type dispatched when the unsubscribe recipient from topic request fails. */
export const UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE =
  '@farfetch/blackout-core/UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE';
/** Action type dispatched when the unsubscribe recipient from topic request starts. */
export const UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST =
  '@farfetch/blackout-core/UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST';
/** Action type dispatched when the unsubscribe recipient from topic request succeeds. */
export const UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS =
  '@farfetch/blackout-core/UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS';

/** Action type dispatched when the application wants to clear a specific unsubscribe recipient from topic request state from the store. */
export const CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST =
  '@farfetch/blackout-core/CLEAR_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST';

/** Action type dispatched when the application wants to clear all unsubscribe recipient from topic requests state from the store. */
export const CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS =
  '@farfetch/blackout-core/CLEAR_ALL_UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUESTS';
