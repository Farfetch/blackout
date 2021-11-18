/**
 * Contents clients.
 *
 * @module contents/client
 * @category Contents
 * @subcategory Clients
 */
import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/contents/client',
  '@farfetch/blackout-core/contents',
);

export { default as getCommercePages } from './getCommercePages';
export { default as getContentTypes } from './getContentTypes';
export { default as getSearchContents } from './getSearchContents';
export { default as getSEO } from './getSEO';
