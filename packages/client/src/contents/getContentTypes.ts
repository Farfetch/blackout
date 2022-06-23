import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { Config } from '../types';
import type { ContentTypes } from './types';

/**
 * Method to receive all the content types available for a particularly space code.
 *
 * @param spaceCode - The space the content belongs to (website|mobileapp|emailTool...).
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getContentTypes = (
  spaceCode: string,
  config?: Config,
): Promise<ContentTypes> =>
  client
    .get(join(`content/v1/spaces/${spaceCode}/contentTypes`), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getContentTypes;
