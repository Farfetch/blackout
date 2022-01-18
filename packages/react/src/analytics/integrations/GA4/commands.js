/**
 * @module commands
 * @private
 */
import { eventTypes, pageTypes, utils } from '@farfetch/blackout-analytics';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas';
import ga4EventNameMapping, {
  getEventProperties,
  InternalEventTypes,
} from './eventMapping';

const getCommandForEvent = data => {
  const eventName = ga4EventNameMapping[data.event];

  return [['event', eventName, getEventProperties(data.event, data)]];
};

export default {
  [eventTypes.PRODUCT_ADDED_TO_CART]: getCommandForEvent,
  [eventTypes.PRODUCT_REMOVED_FROM_CART]: getCommandForEvent,
  [eventTypes.PAYMENT_INFO_ADDED]: getCommandForEvent,
  [eventTypes.PRODUCT_ADDED_TO_WISHLIST]: getCommandForEvent,
  [eventTypes.PRODUCT_REMOVED_FROM_WISHLIST]: getCommandForEvent,
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
  [pageTypes.WISHLIST]: getCommandForEvent,
  [eventTypes.LOGIN]: getCommandForEvent,
  [eventTypes.SIGNUP_FORM_COMPLETED]: getCommandForEvent,
  [eventTypes.FILTERS_APPLIED]: getCommandForEvent,
  [eventTypes.FILTERS_CLEARED]: getCommandForEvent,
  [eventTypes.SORT_OPTION_CHANGED]: getCommandForEvent,
  [eventTypes.SHARE]: getCommandForEvent,
  [eventTypes.CHANGE_SCALE_SIZE_GUIDE]: getCommandForEvent,
  [eventTypes.CHECKOUT_STARTED]: getCommandForEvent,
  [eventTypes.PLACE_ORDER_STARTED]: getCommandForEvent,
  [eventTypes.CHECKOUT_ABANDONED]: getCommandForEvent,
  [eventTypes.PROMOCODE_APPLIED]: getCommandForEvent,
  [eventTypes.CHECKOUT_STEP_EDITING]: getCommandForEvent,
  [eventTypes.SAME_BILLING_ADDRESS_SELECTED]: getCommandForEvent,
  [eventTypes.ADDRESS_INFO_ADDED]: getCommandForEvent,
  [eventTypes.SHIPPING_METHOD_ADDED]: getCommandForEvent,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY]: getCommandForEvent,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE]: getCommandForEvent,
  [InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR]: getCommandForEvent,
  [eventTypes.INTERACT_CONTENT]: getCommandForEvent,
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

export const defaultExcludedEventsFromArrayProcessing = {
  view_item_list: true,
  view_item: true,
  select_item: true,
  view_promotion: true,
  select_promotion: true,
  add_to_wishlist: true,
  add_to_cart: true,
  remove_from_cart: true,
  view_cart: true,
  begin_checkout: true,
  add_payment_info: true,
  add_shipping_info: true,
  purchase: true,
  refund: true,
};

export const getProductUpdatedEventList = data => {
  const eventProperties = utils.getProperties(data);
  const dispatchGA4EventList = [];

  if (
    eventProperties.quantity &&
    eventProperties.oldQuantity !== eventProperties.quantity
  ) {
    dispatchGA4EventList.push(
      InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY,
    );
  }

  if (
    eventProperties.colour &&
    eventProperties.oldColour !== eventProperties.colour
  ) {
    dispatchGA4EventList.push(InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR);
  }

  if (
    eventProperties.size &&
    eventProperties.oldSize !== eventProperties.size
  ) {
    dispatchGA4EventList.push(InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE);
  }

  // return list of events which will be triggered
  return dispatchGA4EventList;
};
