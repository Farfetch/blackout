import { address2 as data, userId } from 'tests/__fixtures__/addresses';
import { postUserAddress } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserAddress.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postUserAddress', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(data));

    await expect(postUserAddress({ userId }, data)).resolves.toStrictEqual(
      data,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postUserAddress({ userId }, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/addresses`,
      data,
      expectedConfig,
    );
  });
});
