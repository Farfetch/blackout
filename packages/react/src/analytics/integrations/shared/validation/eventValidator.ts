import { get } from 'lodash';
import type { EventData, TrackTypesValues } from '@farfetch/blackout-analytics';
import type { Schema } from '../types/shared.types';

/**
 * Validates the passed in data against the schema
 * defined for the event.
 * The schemas are defined using yup.
 *
 * @see {@link https://github.com/jquense/yup} for more information
 *
 * @param data - Event data provided by analytics.
 * @param validationSchema - The schema to validate the event against.
 *
 * @returns The result of the validation with valid and errorMessage properties.
 */
export default (
  data: EventData<TrackTypesValues>,
  validationSchema?: Schema,
) => {
  const properties = get(data, 'properties', {});

  let validationSucceeded = true;
  let validationErrorMessage;

  if (validationSchema) {
    try {
      validationSchema.validateSync(properties);
    } catch (e) {
      validationSucceeded = false;
      validationErrorMessage = e;
    }
  }

  return {
    isValid: validationSucceeded,
    errorMessage: validationErrorMessage,
  };
};
