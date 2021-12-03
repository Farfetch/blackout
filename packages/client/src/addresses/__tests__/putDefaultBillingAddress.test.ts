import { putDefaultBillingAddress } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/putDefaultBillingAddress.fixtures';
import moxios from 'moxios';

describe('putDefaultBillingAddress', () => {
  const expectedConfig = undefined;
  const id = '123456';
  const userId = 78910;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('putDefaultBillingAddress', () => {
    describe('Account Service', () => {
      it('should handle a client request successfully', async () => {
        fixture.success({ id, userId });

        expect.assertions(2);

        await expect(putDefaultBillingAddress({ id, userId })).resolves.toBe(
          200,
        );
        expect(spy).toHaveBeenCalledWith(
          `/account/v1/users/${userId}/addresses/billing/${id}`,
          {},
          expectedConfig,
        );
      });

      it('should receive a client request error', async () => {
        fixture.failure({ id, userId });

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
