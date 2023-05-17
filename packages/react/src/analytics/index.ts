/**
 * Analytics for web applications.
 */
import * as integrations from './integrations/index.js';
import {
  EventType,
  FromParameterType,
  InteractionType,
  LoginMethodParameterType,
  PageType,
  PlatformType,
} from '@farfetch/blackout-analytics';

export { default as analytics } from './analytics.js';
export {
  integrations,
  EventType,
  FromParameterType,
  InteractionType,
  LoginMethodParameterType,
  PageType,
  PlatformType,
};
export { default as webContext } from './context.js';
