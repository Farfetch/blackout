/**
 * Password Validation Errors
 * * 1201000 - The password should be at least 10 characters in size
 * * 1201001 - The password should contain at least one lower case character
 * * 1201002 - The password should contain at least one upper case character
 * * 1201003 - The password should contain a special character
 * * 1201004 - The password should contain at least one number
 */
export type PasswordValidationErrors =
  | 1201000
  | 1201001
  | 1201002
  | 1201003
  | 1201004;

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

export const PasswordValidationErrorsConstants: Record<
  string,
  PasswordValidationErrors
> = {
  PasswordMinSizeError: 1201000,
  PasswordWithNoLowerCaseError: 1201001,
  PasswordWithNoUpperCaseError: 1201002,
  PasswordWithNoSpecialCharacterError: 1201003,
  PasswordWithNoNumberCaseError: 1201004,
};

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
