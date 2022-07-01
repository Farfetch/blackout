import { postPasswordChange } from '..';
import { userId } from 'tests/__fixtures__/authentication';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPasswordChange.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postPasswordChange', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  const data = {
    oldPassword: 'thisisOLDpassword',
    newPassword: 'thisisNEWpassword',
    userId,
    username: 'pepe',
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);
    await expect(postPasswordChange(data)).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/passwordchange`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(postPasswordChange(data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/passwordchange`,
      data,
      expectedConfig,
    );
  });
});
