import { eventTypes, pageTypes } from '@farfetch/blackout-core/analytics';

/**
 * Error messages and other constants.
 */
export const ERROR_MESSAGE_PREFIX = 'Vitorino: ';
export const INVALID_MAPPER_RETURN_TYPE_ERROR = `${ERROR_MESSAGE_PREFIX} TypeError: The return from the mapper is not an object. Please make sure your mapper return a valid object.`;
export const INVALID_CUSTOM_MAPPER_ERROR_MESSAGE = `${ERROR_MESSAGE_PREFIX} The option "eventsMapper" is not a function. Please make sure you are passing a valid function that will map the analytics' events with Vitorino's page types.`;
export const VITORINO_CALL_ERROR_MESSAGE = `${ERROR_MESSAGE_PREFIX} An error occured while trying to track an event. Please make sure Vitorino was loaded correctly.`;
export const MISSING_CONTEXT_ERROR_MESSAGE =
  'could not find "tenantId" or "clientId". Make sure these values are being passed through "analytics.useContext(() => ({})).';
export const MARKETING_API_PREFIX = '/api';
export const DATA_TEST_SELECTOR = 'vitorino';
export const PROD_SCRIPT_SRC =
  'https://cdn-static.farfetch-contents.com/assets/vitorino/vitorino.min.js';

/**
 * Environment types to be passed in to Vitorino.
 */
export const ENVIRONMENT_TYPES = {
  prod: 'production',
  dev: 'development',
};

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
