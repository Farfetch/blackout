import {
  DeclineCode,
  GetChargeStatus,
  GetCheckoutOrderChargeResponse,
} from '../types';
import { getCheckoutOrderCharge } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getCheckoutOrderCharge.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const chargeId = 'eb92d414-68de-496e-96db-a0c6582b74d4';
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

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
      fixture.success({ id, chargeId, response });
      expect.assertions(2);
      await expect(getCheckoutOrderCharge(id, chargeId)).resolves.toBe(
        response,
      );
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id, chargeId });
      expect.assertions(2);
      await expect(
        getCheckoutOrderCharge(id, chargeId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
