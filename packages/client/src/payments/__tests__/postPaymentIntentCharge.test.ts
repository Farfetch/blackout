import { id, mockCharge as response } from 'tests/__fixtures__/payments';
import { postPaymentIntentCharge } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPaymentIntentCharge.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postPaymentIntentCharge', () => {
  const data = {
    returnUrl: 'string',
    cancelUrl: 'string',
  };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(postPaymentIntentCharge(id, data)).resolves.toMatchObject(
      response,
    );
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(postPaymentIntentCharge(id, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
