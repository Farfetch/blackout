import { getPaymentMethodsByIntent } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByIntent.fixtures';
import moxios from 'moxios';
import type { PaymentMethod } from '../types';

describe('getPaymentMethodsByIntent', () => {
  const expectedConfig = undefined;
  const id = '12345';
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/paymentmethods`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response: PaymentMethod = {
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

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(getPaymentMethodsByIntent(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getPaymentMethodsByIntent(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
