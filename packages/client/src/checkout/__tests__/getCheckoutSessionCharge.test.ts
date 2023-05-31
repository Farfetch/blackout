import { ChargeDeclineCode, ChargeStatus } from '../../payments/types/index.js';
import {
  chargeId,
  mockCheckoutSessionId,
} from 'tests/__fixtures__/checkout/index.mjs';
import { getCheckoutSessionCharge } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getCheckoutSessionCharge.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import type { CheckoutSessionCharge } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutSessionCharge', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}/charges/${chargeId}`;

    it('should handle a client request successfully', async () => {
      const response: CheckoutSessionCharge = {
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

      await expect(
        getCheckoutSessionCharge(mockCheckoutSessionId, chargeId),
      ).resolves.toStrictEqual(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getCheckoutSessionCharge(mockCheckoutSessionId, chargeId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
