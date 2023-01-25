import {
  mockRaffleParticipationResponse,
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getRaffleParticipation.fixtures';
import getRaffleParticipation from '../getRaffleParticipation';
import mswServer from '../../../tests/mswServer';

describe('getRaffleParticipation', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}/participations/${participationId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRaffleParticipationResponse));

    await expect(
      getRaffleParticipation(raffleId, participationId),
    ).resolves.toStrictEqual(mockRaffleParticipationResponse);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getRaffleParticipation(raffleId, participationId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
