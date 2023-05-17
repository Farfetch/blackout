import { ChargeDeclineCode, ChargeStatus } from '../../payments/types/index.js';
import { chargeId, id } from 'tests/__fixtures__/checkout/index.mjs';
import { getCheckoutOrderCharge } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutOrderCharge.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutOrderCharge } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderCharge', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges/${chargeId}`;

    it('should handle a client request successfully', async () => {
      const response: CheckoutOrderCharge = {
        id: 'string',
        status: ChargeStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: 'string',
            operationStatus: ChargeStatus.Processing,
            declineCode: ChargeDeclineCode.NotApplicable,
          },
        ],
      };

      mswServer.use(fixtures.success(response));

      await expect(getCheckoutOrderCharge(id, chargeId)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getCheckoutOrderCharge(id, chargeId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
