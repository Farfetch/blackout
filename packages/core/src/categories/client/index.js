/**
 * Categories clients.
 *
 * @module categories/client
 * @category Categories
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/categories/client',
  '@farfetch/blackout-core/categories',
);

export { default as getCategories } from './getCategories';
export { default as getCategoriesTop } from './getCategoriesTop';
