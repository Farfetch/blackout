import {
  DeclineCode,
  GetChargeStatus,
  GetCheckoutOrderChargeResponse,
} from '../types';
import { getCheckoutOrderCharge } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCheckoutOrderCharge.fixtures';
import mswServer from '../../../tests/mswServer';

describe('checkout client', () => {
  const id = 123456;
  const chargeId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getCheckoutOrderCharge', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges/${chargeId}`;

    it('should handle a client request successfully', async () => {
      const response: GetCheckoutOrderChargeResponse = {
        chargeId: 'string',
        status: GetChargeStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: 'string',
            operationStatus: GetChargeStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      };

      mswServer.use(fixtures.success(response));

      expect.assertions(2);

      await expect(getCheckoutOrderCharge(id, chargeId)).resolves.toStrictEqual(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);

      await expect(
        getCheckoutOrderCharge(id, chargeId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
