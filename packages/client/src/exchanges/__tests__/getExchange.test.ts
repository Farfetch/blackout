import { exchangeId, responses } from 'tests/__fixtures__/exchanges/index.mjs';
import { getExchange } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getExchange.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getExchange', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.getExchange.success;

    mswServer.use(fixtures.success(response));

    await expect(getExchange(exchangeId)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getExchange(exchangeId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/exchanges/${exchangeId}`,
      expectedConfig,
    );
  });
});
