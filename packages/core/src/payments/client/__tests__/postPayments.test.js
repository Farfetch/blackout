import { postPayments } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPayments.fixtures';
import moxios from 'moxios';

describe('postPayments', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const data = {};
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/checkout/v1/orders/${id}/finalize`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ id, response });

    expect.assertions(2);

    await expect(postPayments(id, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(postPayments(id, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
