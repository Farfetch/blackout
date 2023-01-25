import {
  mockRaffleParticipationResponse,
  raffleId,
} from 'tests/__fixtures__/raffles';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postRaffleParticipation.fixtures';
import mswServer from '../../../tests/mswServer';
import postRaffleParticipation from '../postRaffleParticipation';

describe('postRaffleParticipation', () => {
  const data = {
    userId: '1234',
    billingAddressId: '349859304',
    shippingAddressId: '4993994',
    productVariantId: '949',
    paymentTokenId: '1234',
    trackingCorrelationId: null,
  };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}/participations`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRaffleParticipationResponse));
    await expect(
      postRaffleParticipation(raffleId, data),
    ).resolves.toMatchObject(mockRaffleParticipationResponse);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    await expect(
      postRaffleParticipation(raffleId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
