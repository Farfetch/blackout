import { getPaymentMethodsByCountryAndCurrency } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByCountryAndCurrency.fixtures';
import moxios from 'moxios';
import type { PaymentMethod, PaymentMethods } from '../types';

describe('getPaymentMethodsByCountryAndCurrency', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = '/payment/v1/paymentmethods';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const paymentMethod: PaymentMethod = {
      customerAccounts: [
        {
          type: 'string',
          id: 'string',
          description: 'string',
          code: 'string',
          paymentOptions: ['string'],
        },
      ],
      creditCard: {
        type: 'string',
        creditCards: [
          {
            id: 'string',
            description: 'string',
            code: 'string',
          },
        ],
      },
    };

    const response: PaymentMethods = [paymentMethod, paymentMethod];

    fixtures.success({ response });

    expect.assertions(2);
    await expect(getPaymentMethodsByCountryAndCurrency()).resolves.toBe(
      response,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure();

    expect.assertions(2);
    await expect(
      getPaymentMethodsByCountryAndCurrency(),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
