import { validatePassword } from '../index.js';

describe('validatePassword', () => {
  it('Should return no errors', () => {
    const testPassword = 'P44ssW000rd!';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: true,
      errors: [],
    });
  });

  it('Should return an error if the password provided does not contain at least one special character', () => {
    const testPassword = 'P44ssW000rd';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201003],
    });
  });

  it('Should return an error if the password provided does not contain at least one number', () => {
    const testPassword = 'PaassWooord!';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201004],
    });
  });

  it('Should return the error if the password provided does not contain at least one uppercase character', () => {
    const testPassword = 'p44ssw000rd!';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201002],
    });
  });

  it('Should return the error if the password provided does not contain at least one lowercase character', () => {
    const testPassword = 'P44SSW000RD!';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201001],
    });
  });

  it('Should return an error when the provided password does not meet the minimum required length', () => {
    const testPassword = 'Pass123!';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201000],
    });
  });

  it('Should return all the errors simultaneously except the lowercase one', () => {
    const testPassword = 'pass';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201000, 1201002, 1201003, 1201004],
    });
  });

  it('Should return all the errors simultaneously except the uppercase one', () => {
    const testPassword = 'PASS';
    const validationResult = validatePassword(testPassword);

    expect(validationResult).toEqual({
      isValid: false,
      errors: [1201000, 1201001, 1201003, 1201004],
    });
  });
});
