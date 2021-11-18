import { get } from 'lodash';

/**
 * Validates the passed in data against the schema
 * defined for the event.
 * The schemas are defined using yup.
 *
 * @see {@link https://github.com/jquense/yup} for more information
 *
 * @param {object} data - Event data provided by analytics.
 * @param {object} validationSchema - The schema to validate the event against.
 *
 * @returns {object} - The result of the validation with valid and errorMessage properties.
 */
export default (data, validationSchema) => {
  const properties = get(data, 'properties', {});

  let validationSucceded = true;
  let validationErrorMessage;

  if (validationSchema) {
    try {
      validationSchema.validateSync(properties);
    } catch (e) {
      validationSucceded = false;
      validationErrorMessage = e;
    }
  }

  return {
    isValid: validationSucceded,
    errorMessage: validationErrorMessage,
  };
};
