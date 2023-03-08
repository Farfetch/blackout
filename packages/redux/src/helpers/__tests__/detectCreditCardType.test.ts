import { detectCreditCardType } from '..//index.js';

const mockVisaCard = {
  withSpaces: '4111 1111 4555 1142',
  withoutSpaces: '4111111145551142',
};
const expectedResult = {
  code: { name: 'CVV', size: 3 },
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  matchStrength: 1,
  niceType: 'Visa',
  patterns: [4],
  type: 'visa',
};

describe('detectCreditCardType()', () => {
  it('should return a Visa card info when provided a correct number with spaces', () => {
    const result = detectCreditCardType(mockVisaCard.withSpaces);

    expect(result).toEqual(expectedResult);
  });

  it('should return a Visa card info when provided a correct number without spaces', () => {
    const result = detectCreditCardType(mockVisaCard.withoutSpaces);

    expect(result).toEqual(expectedResult);
  });
});
