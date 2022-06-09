import { getPaymentMethods } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethods.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PaymentMethod } from '../types';

describe('getPaymentMethods', () => {
  const expectedConfig = undefined;
  const id = 1;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/orders/${id}?fields=paymentMethods`;

  beforeEach(() => jest.clearAllMocks());

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

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getPaymentMethods(id)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getPaymentMethods(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
