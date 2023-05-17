import {
  EventType,
  InteractionType,
  type TrackEventData,
  utils,
} from '@farfetch/blackout-analytics';
import { validationSchemaBuilder } from '../shared/validation/eventSchemas.js';
import ga4EventNameMapping, {
  getEventProperties,
  InternalEventTypes,
} from './eventMapping.js';
import type { GA4CommandList } from './types/index.js';

/**
 * Returns GA4's event data from analytics data, into ga4 final mapping result.
 *
 * @param data - Analytics event data.
 *
 * @returns Ga4's event data result.
 */
const genericCommandsBuilder = (data: TrackEventData): GA4CommandList => {
  const eventName = ga4EventNameMapping[data.event] as string;
  const eventProperties = getEventProperties(data.event, data);

  return [['event', eventName, eventProperties]];
};

/**
 * Returns event list to track from update product event. This event, can trigger
 * multiple events to ga4, depending of his data conditions.
 *
 * @param data - Event data.
 *
 * @returns List of events which will be triggered.
 */
const getProductUpdatedEventList = (data: TrackEventData): Array<string> => {
  const eventProperties = utils.getProperties(data);
  const dispatchGA4EventList = [];

  if (
    eventProperties.quantity &&
    eventProperties.oldQuantity !== eventProperties.quantity
  ) {
    dispatchGA4EventList.push(
      InternalEventTypes.ProductUpdated.CHANGE_QUANTITY,
    );
  }

  if (
    eventProperties.size &&
    eventProperties.oldSize !== eventProperties.size
  ) {
    dispatchGA4EventList.push(InternalEventTypes.ProductUpdated.CHANGE_SIZE);
  }

  if (
    eventProperties.colour &&
    eventProperties.oldColour !== eventProperties.colour
  ) {
    dispatchGA4EventList.push(InternalEventTypes.ProductUpdated.CHANGE_COLOUR);
  }

  // return list of events which will be triggered
  return dispatchGA4EventList;
};

/**
 * Product updated custom command builder. It check with internal properties and
 * trigger internal events that needs to trigger.
 *
 * @param data - Analytics event data.
 *
 * @returns Event command list.
 */
const productUpdatedEventCommandsBuilder = (
  data: TrackEventData,
): GA4CommandList => {
  const internalEvents = getProductUpdatedEventList(data);

  const commands = internalEvents.map(internalEvent =>
    genericCommandsBuilder({ ...data, event: internalEvent })?.shift(),
  ) as GA4CommandList;

  return commands;
};

/**
 * Interact Content custom command builder. It check with internal properties and
 * trigger internal events that needs to trigger.
 *
 * @param data - Analytics event data.
 *
 * @returns Event command list.
 */
const interactContentEventCommandsBuilder = (data: TrackEventData) => {
  const eventProperties = data.properties;

  if (
    eventProperties.interactionType === InteractionType.Scroll &&
    eventProperties.target === document.body
  ) {
    return genericCommandsBuilder({
      ...data,
      event: InternalEventTypes.PAGE_SCROLL,
    });
  }

  return genericCommandsBuilder(data);
};

// Custom command builder events List.
const specializedCommandsBuilderByEvent: {
  [event: string]: (data: TrackEventData) => GA4CommandList;
} = {
  [EventType.ProductUpdated]: productUpdatedEventCommandsBuilder,
  [EventType.InteractContent]: interactContentEventCommandsBuilder,
};

// Schema used to validate the output of command functions
export const commandListSchema = validationSchemaBuilder
  .array()
  .of(validationSchemaBuilder.array());

// List of default non-interaction events
export const nonInteractionEvents = {
  [EventType.CheckoutStepViewed]: true,
  [EventType.ProductListViewed]: true,
  [EventType.ProductViewed]: true,
};

/**
 * Check which command builder needs current event.
 *
 * @param data - event name.
 *
 * @returns command result.
 */
const commands = (event: string) => {
  const specializedEventCommandsBuilder =
    specializedCommandsBuilderByEvent[event];

  if (specializedEventCommandsBuilder) {
    return specializedEventCommandsBuilder;
  }

  if (ga4EventNameMapping[event]) {
    return genericCommandsBuilder;
  }

  return undefined;
};

export default commands;
