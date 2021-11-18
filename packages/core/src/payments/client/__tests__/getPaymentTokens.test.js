import { getPaymentTokens } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getPaymentTokens.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getPaymentTokens', () => {
  const query = { orderId: 1, showExpiredCards: false };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const expectedUrl = join('/payment/v1/tokens', { query });

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ query, response });

    expect.assertions(2);

    await expect(getPaymentTokens(query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ query });

    expect.assertions(2);

    await expect(getPaymentTokens(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
