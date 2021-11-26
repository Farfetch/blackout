import * as actionTypes from '../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Sets the app country code.
 *
 * @function setCountryCode
 * @memberof module:locale/actions
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2).
 *
 * @returns {Function} - Dispatch set country code action.
 */

export default (countryCode: string) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.SET_COUNTRY_CODE,
    payload: { countryCode },
  });
};
