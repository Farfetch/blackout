import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { Config } from '../types/index.js';
import type { ContentTypes } from './types/index.js';

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
