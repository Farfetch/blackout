import { NON_DIGIT } from './regex';
import creditCardType from 'credit-card-type';
import type { CreditCardType } from 'credit-card-type/src/types';

/**
 * Detect credit card type based on the value received.
 *
 * @see {@link https://github.com/braintree/credit-card-type#creditcardtypenumber-string}
 *
 * @param value - Credit card number.
 *
 * @returns Credit card type for the given value.
 */
const detectCreditCardType = (
  value: string,
): CreditCardType | undefined | false => {
  const valueWithoutSpaces = value.replace(NON_DIGIT, '');
  const detectedCardTypes = creditCardType(valueWithoutSpaces);
  const cardType = detectedCardTypes.length > 0 && detectedCardTypes[0];

  return cardType;
};

export default detectCreditCardType;
