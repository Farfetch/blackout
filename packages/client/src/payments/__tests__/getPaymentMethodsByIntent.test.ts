import { getPaymentMethodsByIntent } from '..';
import { id } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByIntent.fixtures';
import mswServer from '../../../tests/mswServer';
import type { PaymentMethod } from '../types';

describe('getPaymentMethodsByIntent', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/paymentmethods`;

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

    await expect(getPaymentMethodsByIntent(id)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getPaymentMethodsByIntent(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
