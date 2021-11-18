import { putDefaultBillingAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/putDefaultBillingAddress.fixtures';
import moxios from 'moxios';

describe('putDefaultBillingAddress', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const userId = '78910';
  const spy = jest.spyOn(client, 'put');
  const response = { success: true };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putDefaultBillingAddress', () => {
    describe('Legacy', () => {
      it('should handle a client request successfully', async () => {
        fixture.legacy.success({ id, response });

        expect.assertions(2);

        await expect(putDefaultBillingAddress(id)).resolves.toBe(response);
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/billing/${id}`,
          {},
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.legacy.failure({ id });

        expect.assertions(2);

        await expect(putDefaultBillingAddress(id)).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/legacy/v1/addressbook/billing/${id}`,
          {},
          expectedConfig,
        );
      });
    });

    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.accsvc.success({ id, userId, response });

        expect.assertions(2);

        await expect(putDefaultBillingAddress({ id, userId })).resolves.toBe(
          response,
        );
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/billing/${id}`,
          {},
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.accsvc.failure({ id, userId });

        expect.assertions(2);

        await expect(
          putDefaultBillingAddress({ id, userId }),
        ).rejects.toMatchSnapshot();
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/billing/${id}`,
          {},
          expectedConfig,
        );
      });
    });
  });
});
