import * as actionTypes from '../actionTypes';
import * as selectors from '../selectors';
import client, { headers } from '../../../helpers/client';

const DEFAULT_ACTION_TYPES = new Set([actionTypes.SET_COUNTRY]);

/**
 * Gets the final set of action types the middleware should listen to.
 *
 * @private
 * @param {Set} actionTypes - A set of action types for the middleware to listen to.
 *
 * @returns {Set} Set of action types to apply.
 */
const getActionTypes = actionTypes => {
  if (actionTypes) {
    if (actionTypes instanceof Set) {
      return actionTypes;
    }

    if (Array.isArray(actionTypes)) {
      return new Set(actionTypes);
    }
  }

  return DEFAULT_ACTION_TYPES;
};

/**
 * Middleware to update the defaults after the provided actions.
 *
 * @function setCountry
 * @memberof module:locale/middlewares
 *
 * @param {Set} customActionTypes - A set of action types to override the default set of action types the middleware listens to.
 *
 * @returns {Function} Redux middleware.
 */
export default customActionTypes => {
  const actionTypes = getActionTypes(customActionTypes);

  return store => next => action => {
    const actionType = action.type;

    if (actionTypes.has(actionType)) {
      const result = next(action);
      const state = store.getState();
      const countryCode = action.payload.countryCode;
      const cultureCode = selectors.getCultureCode(state, countryCode);
      const currencyCode = selectors.getCurrencyCode(state, countryCode);

      client.defaults.headers.common[headers.ACCEPT_LANGUAGE] = cultureCode;
      client.defaults.headers.common[headers.FF_COUNTRY] = countryCode;
      client.defaults.headers.common[headers.FF_CURRENCY] = currencyCode;

      return result;
    }

    return next(action);
  };
};
