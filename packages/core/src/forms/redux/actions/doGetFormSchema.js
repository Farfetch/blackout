import * as actionTypes from '../actionTypes';

/* eslint-disable jsdoc/no-undefined-types */

/**
 * @callback GetFormSchemaThunkFactory
 * @alias GetFormSchemaThunkFactory
 * @memberof module:forms/actions
 *
 * @param {string} schemaCode - Schema code to request for.
 * @param {GetFormSchemaQuery} [query] - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/* eslint-enable jsdoc/no-undefined-types */

/**
 * Load form schemas by schema code.
 *
 * @function doGetFormSchema
 * @memberof module:forms/actions
 *
 * @param {Function} getFormSchema - Get form schema client.
 * @see {module:forms/client.getFormSchema}
 *
 * @returns {GetFormSchemaThunkFactory} Thunk factory.
 */
export default getFormSchema =>
  (schemaCode, query, config) =>
  async dispatch => {
    dispatch({
      meta: { schemaCode },
      type: actionTypes.GET_FORM_SCHEMA_REQUEST,
    });

    try {
      const result = await getFormSchema(schemaCode, query, config);

      dispatch({
        meta: { schemaCode },
        payload: result,
        type: actionTypes.GET_FORM_SCHEMA_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { schemaCode },
        payload: { error },
        type: actionTypes.GET_FORM_SCHEMA_FAILURE,
      });

      throw error;
    }
  };
