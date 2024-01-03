/**
 * Analytics for web applications.
 */
import * as integrations from './integrations/index.js';
import {
  ElementType,
  EventType,
  FromParameterType,
  InputType,
  InteractionType,
  LoginMethodParameterType,
  PageType,
  PlatformType,
  SearchType,
  SortOptionType,
} from '@farfetch/blackout-analytics';

export { default as analytics } from './analytics.js';
export {
  integrations,
  EventType,
  FromParameterType,
  InputType,
  InteractionType,
  ElementType,
  LoginMethodParameterType,
  PageType,
  PlatformType,
  SearchType,
  SortOptionType,
};
export { default as webContext } from './context.js';
