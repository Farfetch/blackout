import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetTranslations } from './types';

/**
 * @typedef {object} GetTranslationsQuery
 *
 * @property {string[]} [keys] - Get translations specified by their identifier.
 * @property {string} projectExternalId - Get translations for a specific project external identifier.
 * @property {string} subProjectExternalId - Get translations for a specific sub project external identifier.
 * @property {string[]} [languages] - Get translations specified by their language (e.g en,en-US).
 * @property {string} [text] - Filter translations with text similar to the specified value.
 * @property {string} [createdDate] - Filters translations by creation date. Supports multiple operations when filtering (e.g gt:2019-11-04,lt:2019-11-10).
 * @property {string} [updatedDate] - Filters translations by update date. Supports multiple operations when filtering (e.g gt:2019-11-04,lt:2019-11-10).
 * @property {number} [page] - Number of the page to get, starting at 1. The default is 1.
 * @property {number} [pageSize] - Size of each page, as a number between 1 and 180. The default is 60.
 */

/**
 * Method responsible for fetch translations.
 *
 * @function getTranslations
 * @memberof module:language/client
 *
 * @param {GetTranslationsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getTranslations: GetTranslations = (query, config) =>
  client
    .get(
      join('/language/v1/search/translations', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getTranslations;
