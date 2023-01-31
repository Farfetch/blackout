import * as actionTypes from '../actionTypes';

/**
 * Sets the app country.
 *
 * @function doSetCountry
 * @memberof module:locale/actions
 *
 * @param {number} countryCode - Country identifier (ISO 3166-1 alpha-2).
 *
 * @returns {Function} - Dispatch set country action.
 */
export default countryCode => dispatch => {
  dispatch({
    type: actionTypes.SET_COUNTRY,
    payload: { countryCode },
  });
};
