import * as profileClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchUserAttribute.fixtures';
import moxios from 'moxios';

describe('patchUserAttribute', () => {
  const expectedConfig = undefined;
  const data = [
    {
      path: 'string',
      op: 'string',
      value: 'string',
    },
  ];
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = 200;

    fixtures.success({ userId, attributeId, response });

    expect.assertions(2);

    await expect(
      profileClient.patchUserAttribute(userId, attributeId, data),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, attributeId });

    expect.assertions(2);

    await expect(
      profileClient.patchUserAttribute(userId, attributeId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      data,
      expectedConfig,
    );
  });
});
