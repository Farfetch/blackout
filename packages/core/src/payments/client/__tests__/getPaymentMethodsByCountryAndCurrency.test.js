import { getPaymentMethodsByCountryAndCurrency } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getPaymentMethodsByCountryAndCurrency.fixtures';
import moxios from 'moxios';

describe('getPaymentMethodsByCountryAndCurrency client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getPaymentMethodsByCountryAndCurrency', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = '/payment/v1/paymentmethods';

    it('should handle a client request successfully', async () => {
      const response = {};
      fixtures.success({ response });

      expect.assertions(2);
      await expect(getPaymentMethodsByCountryAndCurrency()).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure();

      expect.assertions(2);
      await expect(
        getPaymentMethodsByCountryAndCurrency(),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
