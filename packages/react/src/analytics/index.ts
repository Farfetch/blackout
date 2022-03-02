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
import analyticsWeb from './analytics';

export default analyticsWeb;
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
