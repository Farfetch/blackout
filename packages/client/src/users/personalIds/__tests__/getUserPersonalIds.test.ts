import { getUserPersonalIds } from '..';
import { mockGetPersonalIdsResponse } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserPersonalIds.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getPersonalIds', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const userId = 123456;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = mockGetPersonalIdsResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getUserPersonalIds(userId, config)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(getUserPersonalIds(userId, config)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds`,
      expectedConfig,
    );
  });
});
