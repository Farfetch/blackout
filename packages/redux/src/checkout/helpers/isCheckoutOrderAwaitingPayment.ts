import { type Charge, ChargeStatus } from '@farfetch/blackout-client';

const isCheckoutOrderAwaitingPayment = (
  checkoutOrderCharge: Charge | undefined | null,
) => {
  return (
    checkoutOrderCharge?.status === ChargeStatus.Processing &&
    !!checkoutOrderCharge.redirectUrl
  );
};

export default isCheckoutOrderAwaitingPayment;
