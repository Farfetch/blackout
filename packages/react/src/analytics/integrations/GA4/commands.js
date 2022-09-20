/**
 * @module commands
 * @private
 */
import {
  eventTypes,
  interactionTypes,
  utils,
} from '@farfetch/blackout-core/analytics';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas';
import ga4EventNameMapping, {
  getEventProperties,
  InternalEventTypes,
} from './eventMapping';
import isFinite from 'lodash/isFinite';

const genericCommandsBuilder = data => {
  const eventName = ga4EventNameMapping[data.event];
  const eventProperties = getEventProperties(data.event, data);

  return [['event', eventName, eventProperties]];
};

const getProductUpdatedEventList = data => {
  const eventProperties = utils.getProperties(data);
  const dispatchGA4EventList = [];

  if (
    isFinite(eventProperties.quantity) &&
    eventProperties.oldQuantity !== eventProperties.quantity
  ) {
    dispatchGA4EventList.push(
      InternalEventTypes.PRODUCT_UPDATED.CHANGE_QUANTITY,
    );
  }

  if (
    eventProperties.size &&
    eventProperties.oldSize !== eventProperties.size
  ) {
    dispatchGA4EventList.push(InternalEventTypes.PRODUCT_UPDATED.CHANGE_SIZE);
  }

  if (
    eventProperties.colour &&
    eventProperties.oldColour !== eventProperties.colour
  ) {
    dispatchGA4EventList.push(InternalEventTypes.PRODUCT_UPDATED.CHANGE_COLOUR);
  }

  // return list of events which will be triggered
  return dispatchGA4EventList;
};

const productUpdatedEventCommandsBuilder = data => {
  const internalEvents = getProductUpdatedEventList(data);

  const commands = internalEvents.map(internalEvent =>
    genericCommandsBuilder({ ...data, event: internalEvent })?.shift(),
  );

  return commands;
};

const interactContentEventCommandsBuilder = data => {
  const eventProperties = data.properties;

  if (
    eventProperties.interactionType === interactionTypes.SCROLL &&
    eventProperties.target === document.body
  ) {
    return genericCommandsBuilder({
      ...data,
      event: InternalEventTypes.PAGE_SCROLL,
    });
  }

  return genericCommandsBuilder(data);
};

const specializedCommandsBuilderByEvent = {
  [eventTypes.PRODUCT_UPDATED]: productUpdatedEventCommandsBuilder,
  [eventTypes.INTERACT_CONTENT]: interactContentEventCommandsBuilder,
};

export default event => {
  const specializedEventCommandsBuilder =
    specializedCommandsBuilderByEvent[event];

  if (specializedEventCommandsBuilder) {
    return specializedEventCommandsBuilder;
  }

  if (ga4EventNameMapping[event]) {
    return genericCommandsBuilder;
  }

  return null;
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
