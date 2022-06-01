import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { Contents, QueryContents } from './types';

/**
 * Method responsible for searching the content that corresponds to the query
 * object received.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
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
