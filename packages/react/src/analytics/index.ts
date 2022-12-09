/**
 * Analytics for web applications.
 */
import * as integrations from './integrations';
import {
  EventTypes,
  FromParameterTypes,
  InteractionTypes,
  LoginMethodParameterTypes,
  PageTypes,
  PlatformTypes,
} from '@farfetch/blackout-analytics';
export { default as analytics } from './analytics';
export {
  integrations,
  EventTypes,
  FromParameterTypes,
  InteractionTypes,
  LoginMethodParameterTypes,
  PageTypes,
  PlatformTypes,
};
export { default as webContext } from './context';
