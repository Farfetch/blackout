import * as checkoutClient from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getCheckoutDetails.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = '123456';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCheckoutDetails', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/details?PayerID=GWB9GG3ZHEQWN&orderId=12345667&paymentrequestguid=02f21cbc-2f55-43f5-8a85-c624a70cd2ab&token=EC-84B89991T1463330B`;
    const query = {
      orderId: '12345667',
      paymentrequestguid: '02f21cbc-2f55-43f5-8a85-c624a70cd2ab',
      token: 'EC-84B89991T1463330B',
      PayerID: 'GWB9GG3ZHEQWN',
    };

    it('should handle a client request successfully', async () => {
      const response = {};

      fixture.success({ id, query, response });

      expect.assertions(2);
      await expect(checkoutClient.getCheckoutDetails(id, query)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, query });

      expect.assertions(2);
      await expect(
        checkoutClient.getCheckoutDetails(id, query),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
