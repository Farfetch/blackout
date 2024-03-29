import { deletePaymentIntentInstrument } from '../index.js';
import { id, instrumentId } from 'tests/__fixtures__/payments/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deletePaymentIntentInstrument.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deletePaymentIntentInstrument', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const urlToBeCalled = `/payment/v1/intents/${id}/instruments/${instrumentId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    await expect(deletePaymentIntentInstrument(id, instrumentId)).resolves.toBe(
      200,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deletePaymentIntentInstrument(id, instrumentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
