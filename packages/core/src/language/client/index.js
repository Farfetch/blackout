import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/language/client',
  '@farfetch/blackout-core/language',
);

/**
 * Language clients.
 *
 * @module language/client
 * @category Language
 * @subcategory Clients
 */

export { default as getTranslations } from './getTranslations';
