import { deleteAddress } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/deleteAddress.fixtures';
import moxios from 'moxios';

describe('deleteAddress', () => {
  const expectedConfig = undefined;
  const id = 'c9ce5410-58d9-4298-a385-231a79373e4a';
  const userId = 78910;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('deleteAddress', () => {
    it('should handle a client request successfully', async () => {
      fixture.success({ id, userId });
      expect.assertions(2);

      await expect(deleteAddress({ id, userId })).resolves.toBe(200);
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, userId });

      expect.assertions(2);

      await expect(deleteAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
