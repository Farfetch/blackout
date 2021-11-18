import { deletePaymentToken } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deletePaymentToken.fixtures';
import moxios from 'moxios';

describe('deletePaymentToken', () => {
  const tokenId = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/payment/v1/tokens/${tokenId}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ tokenId, response });

    expect.assertions(2);

    await expect(deletePaymentToken(tokenId)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ tokenId });

    expect.assertions(2);

    await expect(deletePaymentToken(tokenId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
