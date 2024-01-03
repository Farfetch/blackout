/**
 * Analytics for web applications.
 *
 * @module analytics
 * @category Analytics
 */

import * as integrations from './integrations';
import {
  elementTypes,
  eventTypes,
  fromParameterTypes,
  inputTypes,
  interactionTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
  searchTypes,
  sortOptions,
} from '@farfetch/blackout-core/analytics';
import analyticsWeb from './analytics';

export default analyticsWeb;
export {
  elementTypes,
  eventTypes,
  fromParameterTypes,
  inputTypes,
  integrations,
  interactionTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
  searchTypes,
  sortOptions,
};
export { default as webContext } from './context';
