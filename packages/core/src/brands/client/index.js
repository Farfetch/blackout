import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/brands/client',
  '@farfetch/blackout-core/brands',
);

/**
 * Brands clients.
 *
 * @module brands/client
 * @category Brands
 * @subcategory Clients
 */

export { default as getBrand } from './getBrand';
export { default as getBrands } from './getBrands';
