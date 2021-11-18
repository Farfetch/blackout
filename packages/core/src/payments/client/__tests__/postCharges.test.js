import { postCharges } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postCharges.fixtures.js';
import moxios from 'moxios';

describe('post charges', () => {
  const intentId = '123456';
  const data = {
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('postCharges', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = `/payment/v1/intents/${intentId}/charges`;

    it('should handle a client request successfully', async () => {
      const response = {
        headers: {
          location: '243234/charges/1234567',
        },
        data: {
          redirectUrl: 'string',
          returnUrl: 'string',
          cancelUrl: 'string',
        },
      };

      fixtures.success({ intentId, data, response });
      expect.assertions(2);
      await expect(postCharges(intentId, data)).resolves.toMatchObject(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure({ intentId, data });
      expect.assertions(2);
      await expect(postCharges(intentId, data)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
