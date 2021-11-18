import { accsvc, legacy } from '../__fixtures__/postRegister.fixtures';
import { postRegister } from '../';
import { mockResponse as response } from '../__fixtures__/login.fixtures';
import client from '../../../helpers/client';
import moxios from 'moxios';

describe('postRegister', () => {
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  const requestDataLegacy = {
    Email: 'pepe@acme.com',
    Name: 'Pedro Guilherme Fernandes',
    Password: 'pepe123',
    ReceiveNewsLetters: true,
    Username: 'pepe@acme.com',
  };

  const requestDataAccSVC = {
    ...requestDataLegacy,
    countryCode: 'PT',
  };

  describe('legacy', () => {
    it('should handle a client request successfully', async () => {
      legacy.success({ response });

      expect.assertions(2);
      await expect(postRegister(requestDataLegacy)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/register',
        requestDataLegacy,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      legacy.failure();

      expect.assertions(2);
      await expect(postRegister(requestDataLegacy)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/legacy/v1/account/register',
        requestDataLegacy,
        expectedConfig,
      );
    });
  });

  describe('accsvc', () => {
    it('should handle a client request successfully', async () => {
      accsvc.success({ response });

      expect.assertions(2);
      await expect(postRegister(requestDataAccSVC)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/account/v1/users',
        requestDataAccSVC,
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      accsvc.failure();

      expect.assertions(2);
      await expect(postRegister(requestDataAccSVC)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/account/v1/users',
        requestDataAccSVC,
        expectedConfig,
      );
    });
  });
});
