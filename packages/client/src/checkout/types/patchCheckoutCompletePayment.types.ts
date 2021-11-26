import type { Config } from '../../types';
import type { FlatAddress } from '.';

export type PatchCheckoutCompletePaymentData = {
  confirmationParameters: { k: string };
};

export type RecurringPayment = {
  userId: string;
  recurringTokenId: string;
};

export type CreditCard = {
  cardName: string;
  cardNumber: string;
  cardExpiryMonth?: number;
  cardExpiryYear?: number;
  cardCvv?: string;
  cardCavv?: string;
  cardEci?: string;
  cardXid?: string;
};

export type PatchCheckoutCompletePaymentResponse = {
  transactionId: string;
  checkoutOrderId: number;
  createdDate?: string;
  paymentMethodId: string;
  numberOfInstallments?: number;
  recurringPayment?: RecurringPayment;
  creditCard?: CreditCard;
  redirectUrl?: string;
  cancelUrl?: string;
  confirmationRedirectUrl?: string;
  confirmationRedirectUrlPostValues?: { k: string };
  confirmationParameters?: { k: string };
  billingAddressUsed?: FlatAddress;
  paymentStatus: {
    status: string;
    authorizedAmount?: number;
  };
  savePaymentMethodAsToken?: boolean;
  acceptHeader?: string;
  userAgent?: string;
};

export type PatchCheckoutCompletePayment = (
  id: string,
  data: PatchCheckoutCompletePaymentData,
  config?: Config,
) => Promise<PatchCheckoutCompletePaymentResponse>;
