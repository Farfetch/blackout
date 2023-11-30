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
  interactionTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
} from '@farfetch/blackout-core/analytics';
import analyticsWeb from './analytics';

export default analyticsWeb;
export {
  integrations,
  eventTypes,
  fromParameterTypes,
  interactionTypes,
  elementTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
};
export { default as webContext } from './context';
