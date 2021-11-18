import { postPasswordChange } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postPasswordChange.fixtures';
import moxios from 'moxios';

describe('postPasswordChange', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('Legacy', () => {
    const data = {
      oldPassword: 'thisisOLDpassword',
      newPassword: 'thisisNEWpassword',
      username: 'pepe',
    };

    it('should handle a client request successfully', async () => {
      fixtures.legacy.success({ data });

      expect.assertions(2);
      await expect(postPasswordChange(data)).resolves.toMatchObject(
        expect.objectContaining({
          status: 200,
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/password/change',
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.legacy.failure();

      expect.assertions(2);
      await expect(postPasswordChange(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/password/change',
        data,
        expectedConfig,
      );
    });
  });

  describe('Account service', () => {
    const userId = 123123;
    const data = {
      oldPassword: 'thisisOLDpassword',
      newPassword: 'thisisNEWpassword',
      userId,
      username: 'pepe',
    };

    it('should handle a client request successfully', async () => {
      fixtures.accountService.success({ data });

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
      fixtures.accountService.failure({ data });

      expect.assertions(2);
      await expect(postPasswordChange(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        `/account/v1/users/${userId}/passwordchange`,
        data,
        expectedConfig,
      );
    });
  });
});
