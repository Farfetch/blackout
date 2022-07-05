import { name as PCKG_NAME, version as PCKG_VERSION } from '../../package.json';
import { warnDeprecatedMethod } from '../helpers';
import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { CommercePagesContent, QueryCommercePages } from './types';
import type { Config } from '../types';

/**
 * Method to receive all the commerce pages corresponding to the query object
 * received.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCommercePages = (
  query: QueryCommercePages,
  config?: Config,
): Promise<CommercePagesContent> => {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    '@farfetch/blackout-core/contents/client/getCommercePages',
    '@farfetch/blackout-core/contents/client/getContentPages',
  );

  return client
    .get(join('content/v1/commercepages', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getCommercePages;
