import { getUserAttribute } from '..';
import { mockUserAttributesResponse } from 'tests/__fixtures__/users';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUserAttribute.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getUserAttribute', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = mockUserAttributesResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getUserAttribute(userId, attributeId)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      getUserAttribute(userId, attributeId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });
});
