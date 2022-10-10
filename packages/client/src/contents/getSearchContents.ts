import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import merge from 'lodash/merge';
import type { GetSearchContents, QuerySearchContents } from './types';

/**
 * Method responsible for searching the content that corresponds to the query
 * object received.
 *
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getSearchContents: GetSearchContents = (query, config?) => {
  const payload = merge({}, query) as Record<string, unknown>;
  const targets = query?.target || {};

  Object.keys(targets).map(
    key => (payload[`target.${key}`] = query?.target?.[key]),
  );
  delete payload?.target;

  return client
    .get(
      join('/content/v1/search/contents', {
        query: payload as Omit<QuerySearchContents, 'target'>,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default getSearchContents;
