import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { ContentPages, ContentType, QueryContentPages } from './types';

/**
 * Method to receive a content page ranked.
 *
 * @memberof module:contents
 *
 * @param {string} contentType - Type of content to request page ranked (LISTING | SET | PRODUCT).
 * @param {object} query - Query object with search terms to apply.
 * @param {string} query.slug - Query by a page slug.
 * @param {string} [query.strategy] - Query by a specified strategy, if exists.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<ContentPagesContent>} Promise that will resolve when the call to the endpoint finishes.
 */
const getContentPages = (
  contentType: ContentType,
  query: QueryContentPages,
  config?: Config,
): Promise<ContentPages> =>
  client
    .get(join(`wl/v1/content/pages/${contentType}`, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getContentPages;
