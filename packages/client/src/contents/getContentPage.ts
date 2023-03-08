import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { Config } from '../types/index.js';
import type {
  ContentPage,
  ContentPageType,
  QueryContentPage,
} from './types/index.js';

/**
 * Method to receive a content page ranked.
 *
 * @param contentPagesType - Type of content to request page ranked (LISTING | SET | PRODUCT).
 * @param query - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getContentPage = (
  contentPagesType: ContentPageType,
  query: QueryContentPage,
  config?: Config,
): Promise<ContentPage> =>
  client
    .get(join(`wl/v1/content/pages/${contentPagesType}`, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getContentPage;
