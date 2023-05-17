import { getUserPersonalIds } from '../index.js';
import {
  mockGetPersonalIdsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/getUserPersonalIds.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('getPersonalIds', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockGetPersonalIdsResponse));

    await expect(getUserPersonalIds(userId, config)).resolves.toStrictEqual(
      mockGetPersonalIdsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getUserPersonalIds(userId, config)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds`,
      expectedConfig,
    );
  });
});
