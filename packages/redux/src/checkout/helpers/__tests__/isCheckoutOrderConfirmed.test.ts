import { ChargeStatus, CheckoutOrderStatus } from '@farfetch/blackout-client';
import isCheckoutOrderConfirmed from '../isCheckoutOrderConfirmed.js';

describe('isCheckoutOrderConfirmed', () => {
  it('should return true when either order charge status is completed or order status is created', () => {
    expect(
      isCheckoutOrderConfirmed(
        ChargeStatus.Completed,
        CheckoutOrderStatus.OrderCreated,
      ),
    ).toBe(true);

    expect(
      isCheckoutOrderConfirmed(
        ChargeStatus.Completed,
        CheckoutOrderStatus.Paid,
      ),
    ).toBe(true);

    expect(
      isCheckoutOrderConfirmed(
        ChargeStatus.Processing,
        CheckoutOrderStatus.OrderCreated,
      ),
    ).toBe(true);

    expect(
      isCheckoutOrderConfirmed(
        ChargeStatus.Processing,
        CheckoutOrderStatus.Paid,
      ),
    ).toBe(false);

    expect(isCheckoutOrderConfirmed(ChargeStatus.Completed, undefined)).toBe(
      true,
    );

    expect(
      isCheckoutOrderConfirmed(undefined, CheckoutOrderStatus.OrderCreated),
    ).toBe(true);

    expect(isCheckoutOrderConfirmed(undefined, undefined)).toBe(false);
  });
});
