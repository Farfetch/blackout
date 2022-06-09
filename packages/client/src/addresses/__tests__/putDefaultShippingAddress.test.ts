import { putDefaultShippingAddress } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putDefaultShippingAddress.fixtures';
import mswServer from '../../../tests/mswServer';

describe('putDefaultShippingAddress', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const userId = 78910;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  describe('putDefaultShippingAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success());

      expect.assertions(2);

      await expect(putDefaultShippingAddress({ id, userId })).resolves.toBe(
        200,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/shipping/${id}`,
        {},
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        putDefaultShippingAddress({ id, userId }),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/shipping/${id}`,
        {},
        expectedConfig,
      );
    });
  });
});
