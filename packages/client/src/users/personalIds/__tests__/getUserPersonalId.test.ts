import { getUserPersonalId } from '..';
import {
  mockPersonalIdResponse,
  personalId,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserPersonalId.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPersonalIdResponse));

    await expect(
      getUserPersonalId(userId, personalId, config),
    ).resolves.toStrictEqual(mockPersonalIdResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getUserPersonalId(userId, personalId, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      expectedConfig,
    );
  });
});
