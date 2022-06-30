import * as profileClient from '..';
import {
  attributeId,
  mockUserAttributesData,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/putUserAttribute.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('putUserAttribute', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      profileClient.putUserAttribute(
        userId,
        attributeId,
        mockUserAttributesData,
      ),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      mockUserAttributesData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      profileClient.putUserAttribute(
        userId,
        attributeId,
        mockUserAttributesData,
      ),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      mockUserAttributesData,
      expectedConfig,
    );
  });
});
