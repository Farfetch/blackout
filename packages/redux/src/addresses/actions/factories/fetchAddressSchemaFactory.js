import {
  FETCH_ADDRESS_SCHEMA_FAILURE,
  FETCH_ADDRESS_SCHEMA_REQUEST,
  FETCH_ADDRESS_SCHEMA_SUCCESS,
} from '../../actionTypes';

/**
 * @callback FetchAddressSchemaThunkFactory
 * @param {string|number} isoCode - IsoCode.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @function doGetAddressSchema
 * @memberof module:addresses/actions/factories
 *
 * @param {Function} getSchema - Get schema client.
 *
 * @returns {FetchAddressSchemaThunkFactory} Thunk factory.
 */
export default getSchema => (isoCode, config) => async dispatch => {
  dispatch({
    meta: { isoCode },
    type: FETCH_ADDRESS_SCHEMA_REQUEST,
  });

  try {
    const result = await getSchema(isoCode, config);

    const schemaEntity = {
      entities: {
        addressSchema: {
          [isoCode]: result,
        },
      },
      result: isoCode,
    };

    dispatch({
      payload: schemaEntity,
      type: FETCH_ADDRESS_SCHEMA_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_ADDRESS_SCHEMA_FAILURE,
    });

    throw error;
  }
};
