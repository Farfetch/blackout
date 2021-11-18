import { accsvc, legacy } from '../__fixtures__/postPasswordRecover.fixtures';
import { postPasswordRecover } from '../';
import client from '../../../helpers/client';
import moxios from 'moxios';

describe('postPasswordRecover', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('accsvc', () => {
    const data = {
      username: 'pepe@acme.com',
      uri: 'http://some.url.com/account/forgotpassword/reset',
    };
    it('should handle a client request successfully', async () => {
      accsvc.success();

      expect.assertions(2);
      await expect(postPasswordRecover(data)).resolves.toMatchObject(
        expect.objectContaining({
          status: 200,
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        '/account/v1/users/passwordrecover',
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      accsvc.failure();

      expect.assertions(2);
      await expect(postPasswordRecover(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/account/v1/users/passwordrecover',
        data,
        expectedConfig,
      );
    });
  });

  describe('legacy', () => {
    const data = {
      username: 'pepe@acme.com',
    };
    it('should handle a client request successfully', async () => {
      legacy.success();

      expect.assertions(2);
      await expect(postPasswordRecover(data)).resolves.toMatchObject(
        expect.objectContaining({
          status: 200,
        }),
      );
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/password/recover',
        data,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      legacy.failure();

      expect.assertions(2);
      await expect(postPasswordRecover(data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/password/recover',
        data,
        expectedConfig,
      );
    });
  });
});
