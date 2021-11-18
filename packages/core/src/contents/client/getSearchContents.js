import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for searching the content that corresponds to the query object received.
 *
 * @function getSearchContents
 * @memberof module:contents/client
 *
 * @param {object} query - Query object with search terms to apply.
 * @param {string} query.spaceCode - The space the content belongs to (website|mobileapp|emailTool...).
 * @param {string} query.environmentCode - The environment identifier (live | preview).
 * @param {string} query.contentTypeCode - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @param {string | string[]} query.codes - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {number} query.page - Number of the page to get, starting at 1. The default is 1.
 * @param {number} query.pageSize - Size of each page, as a number between 1 and 180. The default is 60.
 * @param {string} [query.sort] - Sort content by (publicationDate:desc | publicationDate:asc | metadataCustom.eventDate:desc | metadataCustom.X:asc).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to the endpoint finishes.
 */
export default (query, config) =>
  client
    .get(join('/content/v1/search/contents', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
