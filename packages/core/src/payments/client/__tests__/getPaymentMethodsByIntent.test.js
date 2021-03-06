import { getPaymentMethodsByIntent } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByIntent.fixtures';
import moxios from 'moxios';

describe('getPaymentMethodsByIntent', () => {
  const expectedConfig = undefined;
  const id = '12345';
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/paymentmethods`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(getPaymentMethodsByIntent(id)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(getPaymentMethodsByIntent(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
