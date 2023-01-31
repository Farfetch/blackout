export const instrumentId = '316bc538-e7e5-4f6c-943f-686350fac5ae';
export const mockGetInstrumentsResponse = [
  {
    id: instrumentId,
    method: 'CreditCard',
    option: 'credit card',
    amounts: [
      {
        classification: 'Domestic',
        value: 27,
        settledValue: 0,
        refundedValue: 0,
      },
    ],
    status: 'Created',
    payer: {
      id: '1213',
      firstName: 'João',
      lastName: 'Batista',
      email: 'joao@mail.com',
      address: {
        addressLine1: 'Rua',
        addressLine2: 'da Candelaria',
        addressLine3: '123',
        vatNumber: '50',
        zipCode: '4470258',
        phone: '91664852',
        neighbourhood: 'Centro',
        ddd: '351',
        city: {
          id: 13,
          name: 'Rio de Janeiro',
          stateId: 2,
          countryId: 55,
        },
        state: {
          id: 55,
          code: '55',
          name: 'Rio de Janeiro',
          countryId: 55,
        },
        country: {
          id: 165,
          name: 'Portugal',
          nativeName: 'Portugal',
          alpha2Code: 'US',
          alpha3Code: 'USD',
          culture: 'en-US',
          region: 'Europe',
          continentId: 3,
        },
      },
    },
    data: {
      cardHolderName: 'Joao Baptista',
      cardFirstDigits: '411111',
      cardLastDigits: '111111',
      cardExpiryMonth: 10,
      cardExpiryYear: 2020,
    },
    installments: {
      quantity: 0,
    },
    shopperInteraction: 'Ecommerce',
  },
];

export const mockGetInstrumentsNormalizedPayload = {
  entities: {
    instruments: {
      [mockGetInstrumentsResponse[0].id]: mockGetInstrumentsResponse[0],
    },
  },
  result: [mockGetInstrumentsResponse[0].id],
};
