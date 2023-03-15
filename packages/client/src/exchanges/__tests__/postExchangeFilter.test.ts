import { postExchangeFilter } from '../index.js';
import { requestData, responses } from 'tests/__fixtures__/exchanges/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postExchangeFilter.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postExchangeFilter()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.postExchangeFilter.success;
    const data = requestData.postExchangeFilter;

    mswServer.use(fixtures.success(response));

    await expect(postExchangeFilter(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/exchangefilters',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = requestData.postExchangeFilter;

    mswServer.use(fixtures.failure());

    await expect(postExchangeFilter(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/exchangefilters',
      data,
      expectedConfig,
    );
  });
});
