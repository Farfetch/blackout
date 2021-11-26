/**
 * @module commands
 * @private
 */
import { eventTypes, pageTypes } from '@farfetch/blackout-analytics';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas';
import ga4EventNameMapping, { getEventProperties } from './eventMapping';

const getCommandForEvent = data => {
  const eventName = ga4EventNameMapping[data.event];

  return [['event', eventName, getEventProperties(data.event, data)]];
};

export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: getCommandForEvent,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: getCommandForEvent,
  [eventTypes.PAYMENT_INFO_ADDED]: getCommandForEvent,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: getCommandForEvent,
  [eventTypes.SHIPPING_INFO_ADDED]: getCommandForEvent,
  [eventTypes.CHECKOUT_STARTED]: getCommandForEvent,
  [eventTypes.ORDER_COMPLETED]: getCommandForEvent,
  [eventTypes.ORDER_REFUNDED]: getCommandForEvent,
  [pageTypes.SEARCH]: getCommandForEvent,
  [eventTypes.SELECT_CONTENT]: getCommandForEvent,
  [eventTypes.PRODUCT_CLICKED]: getCommandForEvent,
  [eventTypes.PRODUCT_VIEWED]: getCommandForEvent,
  [eventTypes.PRODUCT_LIST_VIEWED]: getCommandForEvent,
  [pageTypes.BAG]: getCommandForEvent,
  [eventTypes.LOGIN]: getCommandForEvent,
  [eventTypes.SIGNUP_FORM_COMPLETED]: getCommandForEvent,
};

// Schema used to validate the output of command functions
export const commandListSchema = validationSchemaBuilder
  .array()
  .of(validationSchemaBuilder.array());

// List of default non-interaction events
export const nonInteractionEvents = {
  [eventTypes.CHECKOUT_STEP_VIEWED]: true,
  [eventTypes.PRODUCT_LIST_VIEWED]: true,
  [eventTypes.PRODUCT_VIEWED]: true,
};
