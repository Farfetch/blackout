import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { NormalizedSchema } from 'normalizr';
import type { NormalizedSubscriptionPackages } from './state.types';
import type {
  Subscription,
  SubscriptionPackage,
} from '@farfetch/blackout-client';
import type { UnsubscribeRecipientFromTopicMeta } from './../actions/factories/types';

interface FetchSubscriptionPackagesRequestAction extends Action {
  type: typeof actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST;
}

interface FetchSubscriptionPackagesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS;
  payload: NormalizedSchema<
    SubscriptionPackage,
    NormalizedSubscriptionPackages
  >;
}
interface FetchSubscriptionPackagesFailureAction extends Action {
  type: typeof actionTypes.FETCH_SUBSCRIPTION_PACKAGES_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch subscription packages request is made.
 */
export type FetchSubscriptionPackagesAction =
  | FetchSubscriptionPackagesRequestAction
  | FetchSubscriptionPackagesSuccessAction
  | FetchSubscriptionPackagesFailureAction;

interface FetchUserSubscriptionsRequestAction extends Action {
  type: typeof actionTypes.FETCH_USER_SUBSCRIPTIONS_REQUEST;
}

interface FetchUserSubscriptionsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_USER_SUBSCRIPTIONS_SUCCESS;
  payload: Subscription[];
}
interface FetchUserSubscriptionsFailureAction extends Action {
  type: typeof actionTypes.FETCH_USER_SUBSCRIPTIONS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the fetch user subscriptions request is made.
 */
export type FetchUserSubscriptionsAction =
  | FetchUserSubscriptionsRequestAction
  | FetchUserSubscriptionsSuccessAction
  | FetchUserSubscriptionsFailureAction;

interface UnsubscribeFromSubscriptionRequestAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_REQUEST;
}

interface UnsubscribeFromSubscriptionSuccessAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_SUCCESS;
}
interface UnsubscribeFromSubscriptionFailureAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_FROM_SUBSCRIPTION_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the unsubscribe from subscription request is made.
 */
export type UnsubscribeFromSubscriptionAction =
  | UnsubscribeFromSubscriptionRequestAction
  | UnsubscribeFromSubscriptionSuccessAction
  | UnsubscribeFromSubscriptionFailureAction;

type UnsubscribeRecipientFromTopicPayload = {
  subscriptionId?: string;
  topicId?: string;
  recipientId?: string;
};

interface UnsubscribeRecipientFromTopicRequestAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_REQUEST;
  payload: UnsubscribeRecipientFromTopicPayload;
  meta?: UnsubscribeRecipientFromTopicMeta;
}

interface UnsubscribeRecipientFromTopicSuccessAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_SUCCESS;
  payload: UnsubscribeRecipientFromTopicPayload;
}
interface UnsubscribeRecipientFromTopicFailureAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_RECIPIENT_FROM_TOPIC_FAILURE;
  payload: { recipientId?: string; error: BlackoutError };
}

/**
 * Actions dispatched when the unsubscribe recipient from topic request is made.
 */
export type UnsubscribeRecipientFromTopicAction =
  | UnsubscribeRecipientFromTopicRequestAction
  | UnsubscribeRecipientFromTopicSuccessAction
  | UnsubscribeRecipientFromTopicFailureAction;

interface UpdateUserSubscriptionsRequestAction extends Action {
  type: typeof actionTypes.UPDATE_USER_SUBSCRIPTIONS_REQUEST;
}

interface UpdateUserSubscriptionsSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_USER_SUBSCRIPTIONS_SUCCESS;
}

interface UpdateUserSubscriptionsFailureAction extends Action {
  type: typeof actionTypes.UPDATE_USER_SUBSCRIPTIONS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the unsubscribe from subscription request is made.
 */
export type UpdateUserSubscriptionsAction =
  | UpdateUserSubscriptionsRequestAction
  | UpdateUserSubscriptionsSuccessAction
  | UpdateUserSubscriptionsFailureAction;

/**
 * Actions dispatched when the reset subscriptions action is called.
 */
export interface ResetSubscriptionsStateAction extends Action {
  type: typeof actionTypes.RESET_SUBSCRIPTIONS;
}
