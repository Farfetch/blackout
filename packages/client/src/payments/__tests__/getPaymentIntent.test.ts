import { getPaymentIntent } from '../index.js';
import {
  id,
  mockFetchIntentResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPaymentIntent.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getPaymentIntent', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchIntentResponse));

    await expect(getPaymentIntent(id)).resolves.toStrictEqual(
      mockFetchIntentResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getPaymentIntent(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
