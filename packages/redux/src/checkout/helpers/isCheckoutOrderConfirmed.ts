import { ChargeStatus, CheckoutOrderStatus } from '@farfetch/blackout-client';

const isCheckoutOrderConfirmed = (
  checkoutOrderChargeStatus: ChargeStatus | undefined,
  checkoutOrderStatus: CheckoutOrderStatus | undefined,
) => {
  return (
    checkoutOrderChargeStatus === ChargeStatus.Completed ||
    checkoutOrderStatus === CheckoutOrderStatus.OrderCreated
  );
};

export default isCheckoutOrderConfirmed;
