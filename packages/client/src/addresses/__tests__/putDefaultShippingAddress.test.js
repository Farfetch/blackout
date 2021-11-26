import { putDefaultShippingAddress } from '../';
import client from '../../helpers/client';
import fixture from '../__fixtures__/putDefaultShippingAddress.fixtures';
import moxios from 'moxios';

describe('putDefaultShippingAddress', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const userId = 78910;
  const spy = jest.spyOn(client, 'put');
  const response = { success: true };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putDefaultShippingAddress', () => {
    it('should handle a client request successfully', async () => {
      fixture.success({ id, userId, response });

      expect.assertions(2);

      await expect(putDefaultShippingAddress({ id, userId })).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/shipping/${id}`,
        {},
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, userId });

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
