import { deletePaymentToken } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deletePaymentToken.fixtures';
import moxios from 'moxios';

describe('deletePaymentToken', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/payment/v1/tokens/${id}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success({ id });

    expect.assertions(2);

    await expect(deletePaymentToken(id)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id });

    expect.assertions(2);

    await expect(deletePaymentToken(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
