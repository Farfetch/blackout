import { deletePaymentToken } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deletePaymentToken.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deletePaymentToken', () => {
  const id = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/payment/v1/tokens/${id}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(deletePaymentToken(id)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(deletePaymentToken(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
