import {
  exchangeId,
  requestData,
  responses,
} from 'tests/__fixtures__/exchanges/index.mjs';
import { postExchangeBookRequest } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postExchangeBookRequest.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postExchangeBookRequest()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.postExchangeBookRequest.success;
    const data = requestData.postExchangeBookRequest;

    mswServer.use(fixtures.success(response));

    await expect(
      postExchangeBookRequest(exchangeId, data),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}/bookRequests`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = requestData.postExchangeBookRequest;

    mswServer.use(fixtures.failure());

    await expect(
      postExchangeBookRequest(exchangeId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}/bookRequests`,
      data,
      expectedConfig,
    );
  });
});
