export type PaymentMethod = {
  customerAccounts: {
    type: string;
    id: string;
    description: string;
    code: string;
    paymentOptions: string[];
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
