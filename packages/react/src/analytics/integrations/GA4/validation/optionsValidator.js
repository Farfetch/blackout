import {
  INIT_ERROR,
  MESSAGE_PREFIX,
  OPTION_DATA_LAYER_NAME,
  OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS,
  OPTION_LOAD_SCRIPT_FUNCTION,
  OPTION_MEASUREMENT_ID,
  OPTION_NON_INTERACTION_EVENTS,
  OPTION_ON_PRE_PROCESS_COMMANDS,
  OPTION_PRODUCT_MAPPINGS,
  OPTION_SCHEMAS,
  OPTION_SCOPE_COMMANDS,
} from '../constants';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

const optionsInterface = {
  [OPTION_ENABLE_AUTOMATIC_PAGE_VIEWS]: { type: 'boolean', required: false },
  [OPTION_LOAD_SCRIPT_FUNCTION]: { type: 'function', required: false },
  [OPTION_MEASUREMENT_ID]: { type: 'string', required: true },
  [OPTION_NON_INTERACTION_EVENTS]: { type: 'object', required: false },
  [OPTION_ON_PRE_PROCESS_COMMANDS]: { type: 'function', required: false },
  [OPTION_PRODUCT_MAPPINGS]: { type: 'object', required: false },
  [OPTION_SCHEMAS]: { type: 'object', required: false },
  [OPTION_SCOPE_COMMANDS]: { type: 'object', required: false },
  [OPTION_DATA_LAYER_NAME]: { type: 'string', required: false },
};

/**
 * Validates if a field is valid taking in account the properties defined on the option interface.
 *
 * @param {string} fieldName - Field name to be validated.
 * @param {object} options - Field interface properties.
 *
 * @returns {boolean} - Returns true if validation passes.
 */
const validateField = (fieldName, options) => {
  if (
    optionsInterface[fieldName].required &&
    options[fieldName] === undefined
  ) {
    throw new Error(
      `[GA4] - Unable to initialize GA4: ${fieldName} is a required field and it was not provided`,
    );
  }

  if (
    !isNil(options[fieldName]) &&
    typeof options[fieldName] !== optionsInterface[fieldName].type
  ) {
    throw new TypeError(
      `${MESSAGE_PREFIX}${INIT_ERROR}Invalid type ${typeof options[
        fieldName
      ]} sent
      on ${fieldName}, expected type was ${optionsInterface[fieldName].type}`,
    );
  }

  return true;
};

/**
 * Iterates all fields defined on optionsInterface and creates a map with each validation.
 *
 * @param {object} options - Field interface properties.
 *
 * @returns {Map} - Returns a map with each field validation value.
 */
export const validateFields = options => {
  if (isNil(options) || isEmpty(options)) {
    throw new Error(
      `${MESSAGE_PREFIX}${INIT_ERROR}options object was not provided`,
    );
  }

  const fieldsValidationMap = new Map();
  Object.keys(optionsInterface).forEach(field =>
    fieldsValidationMap.set(field, validateField(field, options)),
  );
  return fieldsValidationMap;
};
