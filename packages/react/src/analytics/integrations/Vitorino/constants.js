import { AnalyticsConstants } from '..';
import { eventTypes, pageTypes } from '@farfetch/blackout-core/analytics';

export const VITORINO_PROVIDERS = {
  riskified: 'riskified',
  forter: 'forter',
};

/**
 * Environment types to be passed in to Vitorino.
 */
export const ENVIRONMENT_TYPES = AnalyticsConstants.ENVIRONMENT_TYPES;

/**
 * This mapper is stored in a function because having a direct assignment to a variable
 * with references to the window will cause the server render to crash.
 * Having it within a function we can prevent that from happening because we only access it later in runtime when its safe to do so.
 *
 * @returns {object} - The mapper itself.
 */
export const GET_EVENTS_MAPPER_FN = () => ({
  [pageTypes.CHECKOUT_SHIPPING]: window.Vitorino.PageTypes.SHIPPING,
  [pageTypes.LOGIN]: window.Vitorino.PageTypes.LOGIN,
  [pageTypes.REGISTER]: window.Vitorino.PageTypes.REGISTER,
  [pageTypes.LOGIN_REGISTER]: [
    window.Vitorino.PageTypes.REGISTER,
    window.Vitorino.PageTypes.LOGIN,
  ],
  [eventTypes.PLACE_ORDER_STARTED]: window.Vitorino.PageTypes.CHECKOUT,
  [eventTypes.SIGNUP_FORM_VIEWED]: window.Vitorino.PageTypes.REGISTER,
  [eventTypes.CHECKOUT_STEP_VIEWED]: window.Vitorino.PageTypes.SHIPPING,
});
