const PASSWORD_VALIDATIONS = [
  {
    // Password length validation
    validation: /^[a-zA-Z0-9\W]{10,}$/,
    errorCode: 1201000,
  },
  {
    // Password lower case validation
    validation: /(?=.*[a-z])/,
    errorCode: 1201001,
  },
  {
    // Password upper case validation
    validation: /(?=.*[A-Z])/,
    errorCode: 1201002,
  },
  {
    // Password special character validation
    validation: /(?=.*\W)/,
    errorCode: 1201003,
  },
  {
    // Password numbers validation
    validation: /(?=.*\d)/,
    errorCode: 1201004,
  },
];

/**
 * @typedef {object} ValidatePasswordResult
 * @property {string} isValid - Boolean that determines if the password fulfills all the requisites.
 * @property {Array<number>} errors - Array containing of errorCodes of the errors that were detected.
 *
 * Possible errors:
 * 1201000 - The password should be at least 10 characters in size.
 * 1201001 - The password should contain at least one lower case character.
 * 1201002 - The password should contain at least one upper case character.
 * 1201003 - The password should contain a special character.
 * 1201004 - The password should contain at least one number.
 *
 */

/**
 * Validates the password strength, it provides all the errors that aren't fulfilled.
 *
 * @param   {Function} password - Password that will be tested.
 *
 * @returns {ValidatePasswordResult} - Object containing the result of the validation.
 * */
export default password => {
  const result = {
    isValid: true,
    errors: [],
  };

  for (const item of PASSWORD_VALIDATIONS) {
    const isValid = item.validation.test(password);

    if (!isValid) {
      result['isValid'] = false;
      result['errors'].push(item.errorCode);
    }
  }

  return result;
};
