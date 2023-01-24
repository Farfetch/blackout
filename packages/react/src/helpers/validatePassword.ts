/**
 * Password Validation Errors
 * * 1201000 - The password should be at least 10 characters in size
 * * 1201001 - The password should contain at least one lower case character
 * * 1201002 - The password should contain at least one upper case character
 * * 1201003 - The password should contain a special character
 * * 1201004 - The password should contain at least one number
 */
export enum PasswordValidationErrors {
  MinSizeError = 1201000,
  NoLowerCaseLetterError = 1201001,
  NoUpperCaseLetterError = 1201002,
  NoSpecialCharacterError = 1201003,
  NoNumberError = 1201004,
}

export type PasswordValidationResult = {
  isValid: boolean;
  errors: Array<PasswordValidationErrors>;
};

const PASSWORD_VALIDATIONS: Array<{
  validation: RegExp;
  errorCode: PasswordValidationErrors;
}> = [
  {
    // Password length validation
    validation: /^[a-zA-Z0-9\W]{10,}$/,
    errorCode: PasswordValidationErrors.MinSizeError,
  },
  {
    // Password lower case validation
    validation: /(?=.*[a-z])/,
    errorCode: PasswordValidationErrors.NoLowerCaseLetterError,
  },
  {
    // Password upper case validation
    validation: /(?=.*[A-Z])/,
    errorCode: PasswordValidationErrors.NoUpperCaseLetterError,
  },
  {
    // Password special character validation
    validation: /(?=.*\W)/,
    errorCode: PasswordValidationErrors.NoSpecialCharacterError,
  },
  {
    // Password numbers validation
    validation: /(?=.*\d)/,
    errorCode: PasswordValidationErrors.NoNumberError,
  },
];

/**
 * Validates the password strength, it provides all the errors that aren't fulfilled.
 *
 * @param password - Password that will be tested.
 *
 * @returns - Object containing the result of the validation.
 * */
export default function validatePassword(
  password: string,
): PasswordValidationResult {
  const result: PasswordValidationResult = {
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
}
