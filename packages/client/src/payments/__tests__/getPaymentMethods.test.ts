import { getPaymentMethods } from '..';
import { orderId as id } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethods.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PaymentMethods } from '../types';

describe('getPaymentMethods', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/orders/${id}?fields=paymentMethods`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: PaymentMethods = {
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
