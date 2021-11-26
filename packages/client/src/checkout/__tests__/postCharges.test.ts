import * as checkoutClient from '..';
import {
  DeclineCode,
  GetChargesResponse,
  GetChargesStatus,
  PostChargesData,
} from '../types';
import client from '../../helpers/client';
import fixture from '../__fixtures__/postCharges.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const data: PostChargesData = {
    redirectUrl: 'string',
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
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges`;

    it('should handle a client request successfully', async () => {
      const response: GetChargesResponse = {
        chargeId: '00000000-0000-0000-0000-000000000000',
        status: GetChargesStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            operationStatus: GetChargesStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      };

      fixture.success({ id, data, response });
      expect.assertions(2);
      await expect(checkoutClient.postCharges(id, data)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, data });
      expect.assertions(2);
      await expect(
        checkoutClient.postCharges(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
