/**
 * SizeScales clients.
 *
 * @module sizeScales/client
 * @category SizeScales
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/sizeScales/client',
  '@farfetch/blackout-core/sizeScales',
);

export { default as getSizeScale } from './getSizeScale';
export { default as getSizeScaleMappings } from './getSizeScaleMappings';
export { default as getSizeScales } from './getSizeScales';
