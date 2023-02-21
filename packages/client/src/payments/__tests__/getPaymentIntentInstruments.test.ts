import { getPaymentIntentInstruments } from '..';
import { id, mockFetchInstrumentsResponse } from 'tests/__fixtures__/payments';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getPaymentIntentInstruments.fixtures';
import mswServer from '../../../tests/mswServer';

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
