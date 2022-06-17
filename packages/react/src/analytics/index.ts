/**
 * Analytics for web applications.
 */
import * as integrations from './integrations';
import {
  eventTypes,
  fromParameterTypes,
  interactionTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
} from '@farfetch/blackout-analytics';
export { default as analytics } from './analytics';
export {
  integrations,
  eventTypes,
  fromParameterTypes,
  interactionTypes,
  loginMethodParameterTypes,
  pageTypes,
  platformTypes,
};
export { default as webContext } from './context';
