import {
  mockPatchPersonalIdResponse,
  personalId,
  userId,
} from 'tests/__fixtures__/users';
import { patchUserPersonalId } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchUserPersonalId.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('patchPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };

  const data = {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    idNumber: 'string',
    name: 'string',
  };
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPatchPersonalIdResponse));

    await expect(
      patchUserPersonalId(userId, personalId, data, config),
    ).resolves.toStrictEqual(mockPatchPersonalIdResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      patchUserPersonalId(userId, personalId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });
});
