import {
  ChargeStatus,
  DeclineCode,
  PostPaymentIntentChargeResponse,
} from '../types';
import { id } from 'tests/__fixtures__/payments';
import { postPaymentIntentCharge } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPaymentIntentCharge.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postPaymentIntentCharge', () => {
  const data = {
    returnUrl: '',
    cancelUrl: '',
  };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: PostPaymentIntentChargeResponse = {
      data: {
        status: ChargeStatus.Processing,
        redirectUrl: '',
        returnUrl: '',
        cancelUrl: '',
        chargeInstruments: [
          {
            id: '',
            operationStatus: ChargeStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      },
      headers: { location: 'https://somelocation.com' },
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postPaymentIntentCharge(id, data)).resolves.toMatchObject(
      response,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(postPaymentIntentCharge(id, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
