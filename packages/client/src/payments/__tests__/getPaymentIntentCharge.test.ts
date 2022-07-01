import { chargeId, id } from 'tests/__fixtures__/payments';
import { ChargeStatus, DeclineCode, PaymentIntentCharge } from '../types';
import { getPaymentIntentCharge } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentIntentCharge.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPaymentIntentCharge', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges/${chargeId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: PaymentIntentCharge = {
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
    await expect(getPaymentIntentCharge(id, chargeId)).resolves.toStrictEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      getPaymentIntentCharge(id, chargeId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
