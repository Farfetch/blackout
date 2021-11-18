import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/products/client',
  '@farfetch/blackout-core/products',
);

/**
 * Products clients.
 *
 * @module products/client
 * @category Products
 * @subcategory Clients
 */
export { default as getSet } from './getSet';
export { default as getProductFittings } from './getProductFittings';
