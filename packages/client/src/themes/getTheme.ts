import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { Config } from '../types/index.js';
import type { QueryTheme, Theme } from './types/index.js';

/**
 * Method to receive a styleguide theme.
 *
 * @param code - Type key code of a styleguide theme.
 * @param query - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getTheme = (
  code: string,
  query?: QueryTheme,
  config?: Config,
): Promise<Theme> =>
  client
    .get(join(`content/v1/themes/${code}`, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getTheme;
