import { warnDeprecatedMethod } from '../../helpers';

/**
 * Forms clients.
 *
 * @module forms/client
 * @category Forms
 * @subcategory Clients
 */
export { default as getFormSchema } from './getFormSchema';
export { default as postFormData } from './postFormData';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/forms/client',
  '@farfetch/blackout-core/forms',
);
