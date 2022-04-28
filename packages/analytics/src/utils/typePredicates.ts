/**
 * Some type predicates which helps in narrowing down the
 * type of the event when using typescript.
 */

import get from 'lodash/get';
import trackTypes from '../types/trackTypes';
import type { EventData, TrackTypesValues } from '..';

export const isScreenEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof trackTypes.SCREEN> => {
  const type = get(data, 'type');

  return type === trackTypes.SCREEN;
};

export const isPageEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof trackTypes.PAGE> => {
  const type = get(data, 'type');

  return type === trackTypes.PAGE;
};

export const isTrackEventType = (
  data: EventData<TrackTypesValues>,
): data is EventData<typeof trackTypes.TRACK> => {
  const type = get(data, 'type');

  return type === trackTypes.TRACK;
};
