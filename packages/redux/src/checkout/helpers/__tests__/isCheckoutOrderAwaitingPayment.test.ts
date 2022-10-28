import { ChargeStatus } from '@farfetch/blackout-client/src/payments';
import isCheckoutOrderAwaitingPayment from '../isCheckoutOrderAwaitingPayment';

describe('isCheckoutOrderAwaitingPayment', () => {
  it('should return true when either charge status is processing and redirect url is defined', () => {
    expect(
      isCheckoutOrderAwaitingPayment({
        status: ChargeStatus.Processing,
        redirectUrl: 'http://redirect.url',
        id: '1',
        returnUrl: 'http://return.url',
        cancelUrl: 'http://cancel.url',
        chargeInstruments: [],
      }),
    ).toBe(true);

    expect(
      isCheckoutOrderAwaitingPayment({
        status: ChargeStatus.Processing,
        redirectUrl: '',
        id: '1',
        returnUrl: 'http://return.url',
        cancelUrl: 'http://cancel.url',
        chargeInstruments: [],
      }),
    ).toBe(false);

    expect(
      isCheckoutOrderAwaitingPayment({
        status: ChargeStatus.Completed,
        redirectUrl: 'http://redirect.url',
        id: '1',
        returnUrl: 'http://return.url',
        cancelUrl: 'http://cancel.url',
        chargeInstruments: [],
      }),
    ).toBe(false);

    expect(
      isCheckoutOrderAwaitingPayment({
        status: ChargeStatus.Completed,
        redirectUrl: '',
        id: '1',
        returnUrl: 'http://return.url',
        cancelUrl: 'http://cancel.url',
        chargeInstruments: [],
      }),
    ).toBe(false);

    expect(isCheckoutOrderAwaitingPayment(undefined)).toBe(false);

    expect(isCheckoutOrderAwaitingPayment(null)).toBe(false);
  });
});
