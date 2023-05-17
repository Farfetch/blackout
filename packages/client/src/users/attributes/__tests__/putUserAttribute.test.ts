import * as profileClient from '../index.js';
import {
  attributeId,
  mockUserAttributesData,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/putUserAttribute.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('putUserAttribute', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

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
