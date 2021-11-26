/**
 * Analytics for web applications.
 *
 * @module analytics
 * @category Analytics
 */

import * as integrations from './integrations';
import {
  eventTypes,
  fromParameterTypes,
  pageTypes,
} from '@farfetch/blackout-analytics';
import analyticsWeb from './analytics';

export default analyticsWeb;
export { integrations, pageTypes, eventTypes, fromParameterTypes };
export { default as webContext } from './context';
