import { getUserAttributes } from '..';
import { mockUserAttributesResponse, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserAttributes.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserAttributes', () => {
  const expectedConfig = undefined;
  const query = {};
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUserAttributesResponse));

    await expect(getUserAttributes(userId, query)).resolves.toStrictEqual(
      mockUserAttributesResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserAttributes(userId, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      expectedConfig,
    );
  });
});
