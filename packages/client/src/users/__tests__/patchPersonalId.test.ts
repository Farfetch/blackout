import { mockPatchPersonalIdResponse } from 'tests/__fixtures__/users';
import { patchPersonalId } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchPersonalId.fixtures';
import moxios from 'moxios';

describe('patchPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const userId = 123456;
  const personalId = '123456';
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

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockPatchPersonalIdResponse;

    fixtures.success({ userId, personalId, response });

    expect.assertions(2);

    await expect(
      patchPersonalId(userId, personalId, data, config),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ userId, personalId });

    expect.assertions(2);

    await expect(
      patchPersonalId(userId, personalId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalIds/${personalId}`,
      data,
      expectedConfig,
    );
  });
});
