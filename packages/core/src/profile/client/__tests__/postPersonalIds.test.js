import { postPersonalIds } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPersonalIds.fixtures';
import moxios from 'moxios';

describe('postPersonalIds', () => {
  const expectedConfig = undefined;
  const userId = '123456';
  const data = {
    backImageId: 'string',
    expiryDate: 'string',
    frontImageId: 'string',
    idNumber: 'string',
    name: 'string',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success(userId, response);

    expect.assertions(2);

    await expect(postPersonalIds(userId, data)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId);

    expect.assertions(2);

    await expect(postPersonalIds(userId, data)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });
});
