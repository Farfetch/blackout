export const getPaymentMethodsResponse = {
  customerAccounts: [
    {
      type: 'CustomerAccount',
      id: '0ea4a071-1268-4530-93ab-10f10964d7d1',
      description: 'Alipay',
      code: 'Alipay',
      paymentOptions: ['WEB'],
    },
    {
      type: 'CustomerAccount',
      id: '764d2815-157f-498a-b0ac-d6311cc8f476',
      description: 'Alipay WAP',
      code: 'AlipayWAP',
      paymentOptions: ['WAP'],
    },
    {
      type: 'CustomerAccount',
      id: 'f56d6086-f08d-4c2e-b55b-63b2d32aa645',
      description: 'PPE',
      code: 'PayPalExp',
      paymentOptions: [],
    },
    {
      type: 'CustomerAccount',
      id: 'cada88b2-aa03-460a-8483-c53f431ff9b0',
      description: 'iDEAL',
      code: 'iDEAL',
      paymentOptions: [],
      issuers: [
        { id: '0805', name: 'RaboBank' },
        { id: '0805', name: 'Revolut' },
        { id: '0721', name: 'ING Bank' },
      ],
    },
  ],
  creditCard: {
    type: 'CreditCard',
    creditCards: [
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'American Express',
        code: 'AMEX',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Diners Club International',
        code: 'DC',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Visa Debit Delta',
        code: 'DELTA',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Discover',
        code: 'DISCOVER',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'JCB',
        code: 'JCB',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'MasterCard',
        code: 'MC',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'UnionPay',
        code: 'UP',
      },
      {
        id: 'e13bb06b-392b-49a0-8acd-3f44416e3234',
        description: 'Visa',
        code: 'VISA',
      },
    ],
  },
};
