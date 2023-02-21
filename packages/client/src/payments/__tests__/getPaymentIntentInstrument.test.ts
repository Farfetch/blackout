import { getPaymentIntentInstrument } from '..';
import {
  id,
  instrumentId,
  mockFetchInstrumentResponse,
} from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentIntentInstrument.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getPaymentIntentInstrument', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments/${instrumentId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockFetchInstrumentResponse));

    await expect(
      getPaymentIntentInstrument(id, instrumentId),
    ).resolves.toStrictEqual(mockFetchInstrumentResponse);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getPaymentIntentInstrument(id, instrumentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
