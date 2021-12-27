import { getUserAttribute } from '..';
import { mockUserAttributesResponse } from 'tests/__fixtures__/users';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getUserAttribute.fixtures';
import moxios from 'moxios';

describe('getUserAttribute', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockUserAttributesResponse;

    fixtures.success({ userId, attributeId, response });

    expect.assertions(2);

    await expect(getUserAttribute(userId, attributeId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, attributeId });

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
