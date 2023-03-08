import { deletePaymentToken } from '../index.js';
import { id } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deletePaymentToken.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deletePaymentToken', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/payment/v1/tokens/${id}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deletePaymentToken(id)).resolves.toBe(200);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(deletePaymentToken(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
