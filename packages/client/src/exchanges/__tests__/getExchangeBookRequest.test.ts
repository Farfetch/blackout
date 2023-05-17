import {
  bookRequestId,
  exchangeId,
  responses,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { getExchangeBookRequest } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getExchangeBookRequest.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getExchangeBookRequest', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getExchangeBookRequest.success;

    mswServer.use(fixtures.success(response));

    await expect(
      getExchangeBookRequest(exchangeId, bookRequestId),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}/bookRequests/${bookRequestId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getExchangeBookRequest(exchangeId, bookRequestId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}/bookRequests/${bookRequestId}`,
      expectedConfig,
    );
  });
});
