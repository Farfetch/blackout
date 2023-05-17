import { postExchange } from '../index.js';
import { requestData, responses } from 'tests/__fixtures__/exchanges/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postExchange.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postExchange()', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.postExchange.success;
    const data = requestData.postExchange;

    mswServer.use(fixtures.success(response));

    await expect(postExchange(data)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/exchanges',
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = requestData.postExchange;

    mswServer.use(fixtures.failure());

    await expect(postExchange(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      '/account/v1/exchanges',
      data,
      expectedConfig,
    );
  });
});
