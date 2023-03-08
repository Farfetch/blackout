import * as actionTypes from '../actionTypes.js';
import type { Dispatch } from 'redux';

/**
 * Sets the app country code.
 *
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2).
 *
 * @returns - Dispatch set country code action.
 */
const setCountryCode = (countryCode: string) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.SET_COUNTRY_CODE,
    payload: { countryCode },
  });
};

export default setCountryCode;
