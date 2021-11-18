/**
 * Bags clients.
 *
 * @module bags/client
 * @category Bags
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/bags/client',
  '@farfetch/blackout-core/bags',
);

export { default as getBag } from './getBag';
export { default as deleteBagItem } from './deleteBagItem';
export { default as patchBagItem } from './patchBagItem';
export { default as postBagItem } from './postBagItem';
