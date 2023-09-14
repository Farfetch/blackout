export type Issuer = {
  name: string;
  id: string;
};

export type CustomerAccountPaymentMethod = {
  type: string;
  id: string;
  description: string;
  code: string;
  paymentOptions: string[];
  issuers?: Issuer[];
  min?: number;
  max?: number;
};

export type CreditCard = {
  id: string;
  description: string;
  code: string;
};

export type CreditCardPaymentMethod = {
  type: string;
  creditCards?: CreditCard[];
  supportsInstallments?: boolean;
  installments?: number[];
};

export type PaymentMethods = {
  customerAccounts: CustomerAccountPaymentMethod[];
  creditCard: CreditCardPaymentMethod;
};
