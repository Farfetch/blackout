import {
  address1,
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses/index.mjs';
import { getUserAddress } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserAddress.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const response = address1;

  beforeEach(() => jest.clearAllMocks());

  describe('getUserAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(getUserAddress({ id, userId })).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getUserAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
