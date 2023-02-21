import {
  attributeId,
  mockUserAttributeResponse,
  userId,
} from 'tests/__fixtures__/users';
import { getUserAttribute } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getUserAttribute.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('getUserAttribute', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUserAttributeResponse));

    await expect(getUserAttribute(userId, attributeId)).resolves.toStrictEqual(
      mockUserAttributeResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getUserAttribute(userId, attributeId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });
});
