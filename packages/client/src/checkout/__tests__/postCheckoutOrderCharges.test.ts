import * as checkoutClient from '..';
import { ChargeStatus, DeclineCode } from '../../payments/types';
import { id } from 'tests/__fixtures__/checkout';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postCheckoutOrderCharges.fixtures';
import mswServer from '../../../tests/mswServer';
import type {
  CheckoutOrderCharge,
  PostCheckoutOrderChargesData,
} from '../types';

describe('checkout client', () => {
  const data: PostCheckoutOrderChargesData = {
    redirectUrl: 'string',
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('postCheckoutOrderCharges', () => {
    const spy = jest.spyOn(client, 'post');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges`;

    it('should handle a client request successfully', async () => {
      const response: CheckoutOrderCharge = {
        chargeId: '00000000-0000-0000-0000-000000000000',
        status: ChargeStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            operationStatus: ChargeStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(
        checkoutClient.postCheckoutOrderCharges(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        checkoutClient.postCheckoutOrderCharges(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
