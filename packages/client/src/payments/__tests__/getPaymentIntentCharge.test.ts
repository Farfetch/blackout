import {
  chargeId,
  id,
  mockFetchPaymentIntentChargeResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import { getPaymentIntentCharge } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPaymentIntentCharge.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getPaymentIntentCharge', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges/${chargeId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchPaymentIntentChargeResponse));

    await expect(getPaymentIntentCharge(id, chargeId)).resolves.toStrictEqual(
      mockFetchPaymentIntentChargeResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getPaymentIntentCharge(id, chargeId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
