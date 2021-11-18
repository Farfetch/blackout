/**
 * Sizeguides clients.
 *
 * @module sizeGuides/client
 * @category SizeGuides
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/sizeguides/client',
  '@farfetch/blackout-core/sizeGuides',
);

export { default as getSizeguides } from './getSizeguides';
