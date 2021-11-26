import { getPaymentMethods } from '..';
import { PaymentMethod } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethods.fixtures';
import moxios from 'moxios';

describe('getPaymentMethods', () => {
  const expectedConfig = undefined;
  const id = 1;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/orders/${id}?fields=paymentMethods`;

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

    await expect(getPaymentMethods(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getPaymentMethods(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
