import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { Contents, QueryContents } from './types';

/**
 * @typedef {object} QueryTarget
 *
 * @alias QueryTarget
 * @memberof module:contents
 *
 * @property {string} [contentzone] - The zone to query by (ROW|EUROPE...).
 * @property {string} [language] - Using country code to query by a specific language (US).
 * @property {string} [country] - Using culture code to query by a specific country (en-US).
 * @property {string} [benefits] - Query content for a benefit (sale).
 */

/**
 * Method responsible for searching the content that corresponds to the query object received.
 *
 * @memberof module:contents
 *
 * @param {QueryContents} query - Query object with search terms to apply.
 * @param {string} query.spaceCode - The space the content belongs to (website|mobileapp|emailTool...).
 * @param {string} query.environmentCode - The environment identifier (live | preview).
 * @param {string} query.contentTypeCode - The content type unique code (page|post|menu|pages|posts|widgets|waterproof...).
 * @param {string|string[]} [query.codes] - List of codes that representing the content code (about-us|today-news|header|productId...).
 * @param {QueryTarget} [query.target] - The targets and respective values that a content type is configured (contentzone:ROW | country:GB | language:en-GB | benefits:test).
 * @param {number} [query.page=1] - Number of the page to get, starting at 1. The default is 1.
 * @param {number} [query.pageSize=60] - Size of each page, as a number between 1 and 180. The default is 60.
 * @param {string} [query.sort] - Sort content by (publicationDate:desc | publicationDate:asc | metadataCustom.eventDate:desc | metadataCustom.X:asc).
 * @param {string} [query.metadataSearchTagsValues] - Filter by metadata tag. Separate multiple values with commas (,). For example, "red,dress".
 * @param {string} [query.metadataCustom] - Filter by content custom metadata. Repeat the parameter for multiple values. For example,
 * (metadataCustom.eventDate=2020-07-21&metadataCustom.eventName=cosmos&metadataCustom.presenter=carl sagan,tyson neil degrasse).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<Contents>} Promise that will resolve when the call to the endpoint finishes.
 */
const getSearchContents = (
  query: QueryContents,
  config?: Config,
): Promise<Contents> => {
  const targets = query?.target || {};
  Object.keys(targets).map(
    key => (query[`target.${key}`] = query?.target?.[key]),
  );
  delete query?.target;

  return client
    .get(join('/content/v1/search/contents', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getSearchContents;
