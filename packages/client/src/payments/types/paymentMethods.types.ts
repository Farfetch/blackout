export type Issuer = {
  name: string;
  id: string;
};

export type PaymentMethods = {
  customerAccounts: {
    type: string;
    id: string;
    description: string;
    code: string;
    paymentOptions: string[];
    issuers?: Issuer[];
  }[];
  creditCard: {
    type: string;
    creditCards: {
      id: string;
      description: string;
      code: string;
    }[];
  };
};
