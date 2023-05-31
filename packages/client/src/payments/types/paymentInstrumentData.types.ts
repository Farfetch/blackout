export enum PayByLinkChannel {
  None = 'None',
  Email = 'Email',
}

export enum PayByLinkContext {
  OrderOnCustomerBehalf = 'OrderOnCustomerBehalf',
  ReAttempt = 'ReAttempt',
}

export type PaymentInstrumentData = {
  cardHolderName?: string;
  cardFirstDigits?: string;
  cardLastDigits?: string;
  cardExpiryMonth?: number;
  cardExpiryYear?: number;
  giftCardLastDigits?: string;
  creditUserId?: string;
  issuer?: string;
  payByLinkChannel?: PayByLinkChannel;
  payByLinkRecipient?: string;
  payByLinkDueDate?: string;
  payByLinkLocale?: string;
  payByLinkContext?: PayByLinkContext;
};
