import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for posting schemas by code.
 *
 * @function postFormData
 * @memberof module:forms/client
 *
 * @param {string} schemaCode - Schema code to filter for.
 * @param {object} data - Schema payload to be posted.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve then the call to the endpoint finishes.
 */
export default (schemaCode, data, config) =>
  client
    .post(`/communication/v1/forms/${schemaCode}/data`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
