import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method to receive all the content types available for a particulary space code.
 *
 * @function getContentTypes
 * @memberof module:contents/client
 *
 * @param {string} spaceCode - The space the content belongs to (website|mobileapp|emailTool...).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (spaceCode, config) =>
  client
    .get(join(`content/v1/spaces/${spaceCode}/contentTypes`), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
