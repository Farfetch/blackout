import { getPaymentIntentInstruments } from '../index.js';
import {
  id,
  mockFetchInstrumentsResponse,
} from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getPaymentIntentInstruments.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getPaymentIntentInstruments', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchInstrumentsResponse));

    await expect(getPaymentIntentInstruments(id)).resolves.toStrictEqual(
      mockFetchInstrumentsResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getPaymentIntentInstruments(id)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
