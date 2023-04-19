import * as checkoutClient from '../index.js';
import { ChargeDeclineCode, ChargeStatus } from '../../payments/types/index.js';
import { id } from 'tests/__fixtures__/checkout/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postCheckoutOrderCharge.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type {
  CheckoutOrderCharge,
  PostCheckoutOrderChargeData,
} from '../types/index.js';

describe('checkout client', () => {
  const data: PostCheckoutOrderChargeData = {
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
        id: '00000000-0000-0000-0000-000000000000',
        status: ChargeStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            operationStatus: ChargeStatus.Processing,
            declineCode: ChargeDeclineCode.NotApplicable,
          },
        ],
      };

      mswServer.use(fixtures.success(response));

      await expect(
        checkoutClient.postCheckoutOrderCharge(id, data),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        checkoutClient.postCheckoutOrderCharge(id, data),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
