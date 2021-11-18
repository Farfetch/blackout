import { deleteAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/deleteAddress.fixtures';
import moxios from 'moxios';

describe('deleteAddress', () => {
  const expectedConfig = undefined;
  const id = 'c9ce5410-58d9-4298-a385-231a79373e4a';
  const userId = '78910';
  const response = { success: true };
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('deleteAddress', () => {
    describe('Legacy', () => {
      it('should handle a client request successfully', async () => {
        fixture.legacy.success({ id, response });
        expect.assertions(2);

        await expect(deleteAddress(id)).resolves.toBe(response);
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/${id}`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.legacy.failure({ id });

        expect.assertions(2);

        await expect(deleteAddress(id)).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/${id}`,
          expectedConfig,
        );
      });
    });

    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.accsvc.success({ id, userId, response });
        expect.assertions(2);

        await expect(deleteAddress({ id, userId })).resolves.toBe(response);
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/${id}`,
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.accsvc.failure({ id, userId });

        expect.assertions(2);

        await expect(deleteAddress({ id, userId })).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/${id}`,
          expectedConfig,
        );
      });
    });
  });
});
