import {
  address1,
  addressId as id,
  userId,
} from 'tests/__fixtures__/addresses';
import { getUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const response = address1;

  beforeEach(() => jest.clearAllMocks());

  describe('getUserAddress', () => {
    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      expect.assertions(2);

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

      expect.assertions(2);

      await expect(getUserAddress({ id, userId })).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/addresses/${id}`,
        expectedConfig,
      );
    });
  });
});
