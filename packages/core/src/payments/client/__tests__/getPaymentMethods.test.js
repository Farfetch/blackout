import { getPaymentMethods } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethods.fixtures';
import moxios from 'moxios';

describe('getPaymentMethods', () => {
  const expectedConfig = undefined;
  const id = 1;
  const expectedUrl = `/checkout/v1/orders/${id}?fields=paymentMethods`;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(getPaymentMethods(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getPaymentMethods(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
