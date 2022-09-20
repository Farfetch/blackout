import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  Subscription,
  SubscriptionPackage,
} from '@farfetch/blackout-client';
import type { NormalizedSchema } from 'normalizr';
import type { SubscriptionPackagesResultNormalized } from './state.types';
import type { UnsubscribeSubscriptionTopicRecipientMeta } from './../actions/factories/types';

interface FetchSubscriptionPackagesRequestAction extends Action {
  type: typeof actionTypes.FETCH_SUBSCRIPTION_PACKAGES_REQUEST;
}

interface FetchSubscriptionPackagesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_SUBSCRIPTION_PACKAGES_SUCCESS;
  payload: NormalizedSchema<
    SubscriptionPackage,
    SubscriptionPackagesResultNormalized
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

interface UnsubscribeSubscriptionRequestAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_REQUEST;
}

interface UnsubscribeSubscriptionSuccessAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_SUCCESS;
}
interface UnsubscribeSubscriptionFailureAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Actions dispatched when the unsubscribe from subscription request is made.
 */
export type UnsubscribeSubscriptionAction =
  | UnsubscribeSubscriptionRequestAction
  | UnsubscribeSubscriptionSuccessAction
  | UnsubscribeSubscriptionFailureAction;

type UnsubscribeSubscriptionTopicRecipientPayload = {
  subscriptionId?: string;
  topicId?: string;
  recipientId?: string;
};

interface UnsubscribeSubscriptionTopicRecipientRequestAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_REQUEST;
  payload: UnsubscribeSubscriptionTopicRecipientPayload;
  meta?: UnsubscribeSubscriptionTopicRecipientMeta;
}

interface UnsubscribeSubscriptionTopicRecipientSuccessAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_SUCCESS;
  payload: UnsubscribeSubscriptionTopicRecipientPayload;
}
interface UnsubscribeSubscriptionTopicRecipientFailureAction extends Action {
  type: typeof actionTypes.UNSUBSCRIBE_SUBSCRIPTION_TOPIC_RECIPIENT_FAILURE;
  payload: { recipientId?: string; error: BlackoutError };
}

/**
 * Actions dispatched when the unsubscribe recipient from topic request is made.
 */
export type UnsubscribeSubscriptionTopicRecipientAction =
  | UnsubscribeSubscriptionTopicRecipientRequestAction
  | UnsubscribeSubscriptionTopicRecipientSuccessAction
  | UnsubscribeSubscriptionTopicRecipientFailureAction;

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
 * Actions dispatched when the reset subscription packages action is called.
 */
export interface ResetSubscriptionPackagesAction extends Action {
  type: typeof actionTypes.RESET_SUBSCRIPTION_PACKAGES;
}

/**
 * Actions dispatched when the reset user subscriptions action is called.
 */
export interface ResetUserSubscriptionsAction extends Action {
  type: typeof actionTypes.RESET_USER_SUBSCRIPTIONS;
}
