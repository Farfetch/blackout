import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for obtaining the workflow of a specific return.
 *
 * @function getReturnWorkflow
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */

export default (id, config) =>
  client
    .get(join('/account/v1/returns', id, 'workflow'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
