import * as actionTypes from '../../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * @callback FetchFormSchemaThunkFactory
 * @alias FetchFormSchemaThunkFactory
 * @memberof module:forms/actions/factories
 *
 * @param {string} schemaCode - Schema code to request for.
 * @param {FetchFormSchemaQuery} [query] - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/* eslint-enable jsdoc/no-undefined-types */

/**
 * Client defined in @farfetch/blackout-client package, inside forms module.
 *
 * @external getFormSchema
 */

/**
 * Method to create a thunk factory configured with the specified client fo fetch form schemas.
 *
 * @function fetchFormSchema
 * @memberof module:forms/actions/factories
 *
 * @param {Function} getFormSchema - Get form schema client.
 * @see {external:getFormSchema}
 *
 * @returns {FetchFormSchemaThunkFactory} Thunk factory.
 */
export default getFormSchema =>
  (schemaCode, query, config) =>
  async dispatch => {
    dispatch({
      meta: { schemaCode },
      type: actionTypes.FETCH_FORM_SCHEMA_REQUEST,
    });

    try {
      const result = await getFormSchema(schemaCode, query, config);

      dispatch({
        meta: { schemaCode },
        payload: result,
        type: actionTypes.FETCH_FORM_SCHEMA_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { schemaCode },
        payload: { error },
        type: actionTypes.FETCH_FORM_SCHEMA_FAILURE,
      });

      throw error;
    }
  };
