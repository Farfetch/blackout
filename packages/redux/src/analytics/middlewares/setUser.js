import { actionTypes as authenticationActionTypes } from '../../authentication';
import { getUser, getUserId, USER_ID_PROPERTY } from '../../entities/selectors';
import { logger } from '@farfetch/blackout-analytics/utils';
import { actionTypes as usersActionTypes } from '@farfetch/blackout-redux/users';
import Analytics, { eventTypes } from '@farfetch/blackout-analytics';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';

export const DEFAULT_TRIGGER_SET_USER_ACTION_TYPES = new Set([
  authenticationActionTypes.LOGIN_SUCCESS,
  authenticationActionTypes.REGISTER_SUCCESS,
  usersActionTypes.FETCH_USER_SUCCESS,
]);

export const DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES = new Set([
  authenticationActionTypes.LOGOUT_SUCCESS,
  usersActionTypes.FETCH_USER_FAILURE,
]);

// Default user traits picker
// Will exclude id property only from the generated traits object
const DEFAULT_USER_TRAITS_PICKER = ({ [USER_ID_PROPERTY]: id, ...rest }) =>
  rest;

// Paths for the options
export const OPTION_TRIGGER_SET_USER_ACTIONS = 'triggerSetUserActions';
export const OPTION_TRIGGER_ANONYMIZE_ACTIONS = 'triggerAnonymizeActions';
export const OPTION_FETCH_USER_SELECTOR = 'getUserSelector';
export const OPTION_FETCH_USER_ID_SELECTOR = 'getUserIdSelector';
export const OPTION_USER_TRAITS_PICKER = 'userTraitsPicker';

/**
 * Gets the final set of action types the middleware should listen to.
 * This is to provide backwards compatibility with the previous version of setUser
 * middleware.
 *
 * @private
 * @param {(Set|Array)} actionTypes - A set of action types for the middleware to listen to. If an array is passed, it will be used to create a Set from.
 * @param {(Set|Array)} defaultActionTypes - Default action types to be used when actionTypes cannot be used.
 *
 * @returns {Set} Set of action types to apply.
 */
const getActionTypes = (actionTypes, defaultActionTypes) => {
  if (actionTypes) {
    if (actionTypes instanceof Set) {
      return actionTypes;
    }

    if (Array.isArray(actionTypes)) {
      return new Set(actionTypes);
    }

    logger.error(
      `[setUser middleware] - Received an invalid value for the 'actionTypes' parameter: ${actionTypes}. ActionTypes must be a Set or an Array instance.`,
    );

    return defaultActionTypes;
  }

  return defaultActionTypes;
};

// Reference to the current user data
let currentUser;

/**
 * Middleware to call `analytics.setUser()` after any action that changes user login state is dispatched.
 *
 * @function setUserMiddleware
 * @memberof module:analytics/middlewares
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {(object | Array | Set)} actionTypesOrOptions - An options object with options to set on the middleware or a set/array of action types to override the default set of action types the middleware listens to.
 * @returns {Function} Redux middleware.
 */
export default (analyticsInstance, actionTypesOrOptions) => {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    logger.error(
      'SetUser middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "setUserMiddleware(analytics, customActionTypes)")',
    );
  }

  let finalOptions;

  // To maintain backwards compatibility, check if the second parameter
  // of this function is a plain object or not
  if (isPlainObject(actionTypesOrOptions)) {
    finalOptions = {
      ...actionTypesOrOptions,
      [OPTION_TRIGGER_SET_USER_ACTIONS]: getActionTypes(
        actionTypesOrOptions[OPTION_TRIGGER_SET_USER_ACTIONS],
        DEFAULT_TRIGGER_SET_USER_ACTION_TYPES,
      ),
      [OPTION_TRIGGER_ANONYMIZE_ACTIONS]: getActionTypes(
        actionTypesOrOptions[OPTION_TRIGGER_ANONYMIZE_ACTIONS],
        DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES,
      ),
    };
  } else {
    // Shorthand version with only an array or set of action types was used.
    // This is the first version of the function, so we apply code to
    // maintain compatibility with the new options format
    finalOptions = {
      [OPTION_TRIGGER_SET_USER_ACTIONS]: getActionTypes(
        actionTypesOrOptions,
        DEFAULT_TRIGGER_SET_USER_ACTION_TYPES,
      ),
    };
  }

  const triggerSetUserActions = get(
    finalOptions,
    OPTION_TRIGGER_SET_USER_ACTIONS,
    DEFAULT_TRIGGER_SET_USER_ACTION_TYPES,
  );

  const triggerAnonymizeActions = get(
    finalOptions,
    OPTION_TRIGGER_ANONYMIZE_ACTIONS,
    DEFAULT_TRIGGER_ANONYMIZE_ACTION_TYPES,
  );

  const getUserSelector = get(
    finalOptions,
    OPTION_FETCH_USER_SELECTOR,
    getUser,
  );

  const getUserIdSelector = get(
    finalOptions,
    OPTION_FETCH_USER_ID_SELECTOR,
    getUserId,
  );

  const userTraitsPicker = get(
    finalOptions,
    OPTION_USER_TRAITS_PICKER,
    DEFAULT_USER_TRAITS_PICKER,
  );

  return store => next => async action => {
    const actionType = action.type;

    if (triggerSetUserActions.has(actionType)) {
      const result = next(action);
      const user = getUserSelector(store.getState());
      const userId = getUserIdSelector(user);
      const currentUserId = getUserIdSelector(currentUser);

      if (userId !== currentUserId) {
        const previousUser = currentUser;
        currentUser = user;

        const isGuest = get(user, 'isGuest', true);
        const previousIsGuest = get(previousUser, 'isGuest', true);
        const userTraits = userTraitsPicker(user);

        await analyticsInstance.setUser(userId, userTraits);

        if (previousIsGuest && !isGuest) {
          const isRegisterAction = get(action, 'meta.isRegisterAction', false);
          const isLoginAction = get(action, 'meta.isLoginAction', false);

          const eventTypeToTrack = isRegisterAction
            ? eventTypes.SIGNUP_FORM_COMPLETED
            : isLoginAction
            ? eventTypes.LOGIN
            : null;

          const eventPayload =
            isRegisterAction || isLoginAction
              ? { method: action.meta.method }
              : null;

          if (eventTypeToTrack) {
            analyticsInstance.track(eventTypeToTrack, eventPayload);
          }
        } else if (!previousIsGuest && isGuest) {
          analyticsInstance.track(eventTypes.LOGOUT);
        }
      }

      return result;
    }

    if (triggerAnonymizeActions.has(actionType)) {
      await analyticsInstance.anonymize();
      currentUser = null;
    }

    return next(action);
  };
};
