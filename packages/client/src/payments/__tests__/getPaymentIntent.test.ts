import { getPaymentIntent } from '..';
import { id, mockFetchIntentResponse } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentIntent.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPaymentIntent', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchIntentResponse));

    expect.assertions(2);
    await expect(getPaymentIntent(id)).resolves.toStrictEqual(
      mockFetchIntentResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getPaymentIntent(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
