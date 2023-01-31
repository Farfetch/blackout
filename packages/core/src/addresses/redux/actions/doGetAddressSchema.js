import {
  GET_ADDRESS_SCHEMA_FAILURE,
  GET_ADDRESS_SCHEMA_REQUEST,
  GET_ADDRESS_SCHEMA_SUCCESS,
} from '../actionTypes';

/**
 * @callback GetAddressSchemaThunkFactory
 * @param {string|number} isoCode - IsoCode or CountryID (to be deprecated).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Obtains the address schema for a country specified with 'id'.
 *
 * @function doGetAddressSchema
 * @memberof module:addresses/actions
 *
 * @param {Function} getSchema - Get schema client.
 *
 * @returns {GetAddressSchemaThunkFactory} Thunk factory.
 */
export default getSchema => (isoCode, config) => async dispatch => {
  dispatch({
    meta: { isoCode },
    type: GET_ADDRESS_SCHEMA_REQUEST,
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
      type: GET_ADDRESS_SCHEMA_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_ADDRESS_SCHEMA_FAILURE,
    });

    throw error;
  }
};
