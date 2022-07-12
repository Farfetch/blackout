import * as actionTypes from '../actionTypes';
import * as selectors from '../selectors';
import { client, headers } from '@farfetch/blackout-client';
import type { Dispatch, Middleware, MiddlewareAPI } from 'redux';

const DEFAULT_ACTION_TYPES = new Set([actionTypes.SET_COUNTRY_CODE]);

/**
 * Gets the final set of action types the middleware should listen to.
 *
 * @param actionTypes - A set of action types for the middleware to listen to.
 *
 * @returns Set of action types to apply.
 */
const getActionTypes = (actionTypes?: Set<string>): Set<string> => {
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
 * @param customActionTypes - A set of action types to override the default set of action types the
 *                            middleware listens to.
 *
 * @returns Redux middleware.
 */
const setCountryCode = (customActionTypes?: Set<string>): Middleware => {
  const actionTypes = getActionTypes(customActionTypes);

  return ({ getState }: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action): Middleware => {
      const actionType = action.type;

      if (actionTypes.has(actionType)) {
        const result = next(action);
        const state = getState();
        const countryCode = action.payload.countryCode;
        const cultureCode = selectors.getCountryCulture(state, countryCode);
        const currencyCode = selectors.getCountryCurrencyCode(
          state,
          countryCode,
        );

        client.defaults.headers.common[headers.ACCEPT_LANGUAGE] = cultureCode;
        client.defaults.headers.common[headers.FF_COUNTRY] = countryCode;
        client.defaults.headers.common[headers.FF_CURRENCY] = currencyCode;

        return result;
      }

      return next(action);
    };
};

export default setCountryCode;
