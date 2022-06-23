import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetSizeScale } from './types';

/**
 * Method responsible for loading the size scale that a product belongs to.
 *
 * @param id     - Scale Identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSizeScale: GetSizeScale = (id, config) =>
  client
    .get(join('/commerce/v1/sizeScales', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSizeScale;
