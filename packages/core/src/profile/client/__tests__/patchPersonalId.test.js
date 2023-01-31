import * as profileClient from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchPersonalId.fixtures';
import moxios from 'moxios';

describe('patchPersonalId', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const personalId = '123456';
  const data = {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    idNumber: 'string',
    name: 'string',
  };
  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(userId, personalId, response);

    expect.assertions(2);

    await expect(
      profileClient.patchPersonalId(userId, personalId, data),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId, personalId);

    expect.assertions(2);

    await expect(
      profileClient.patchPersonalId(userId, personalId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });
});
