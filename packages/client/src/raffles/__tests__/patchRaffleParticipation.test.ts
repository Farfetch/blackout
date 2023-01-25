import { participationId, raffleId } from 'tests/__fixtures__/raffles';
import { RaffleParticipationStatus } from '../types';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchRaffleParticipation.fixtures';
import mswServer from '../../../tests/mswServer';
import patchRaffleParticipation from '../patchRaffleParticipation';

describe('patchRaffleParticipation', () => {
  const data = [
    {
      value: RaffleParticipationStatus.Cancelled,
      path: '/status',
      op: 'replace',
      from: '',
    },
  ];
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'patch');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}/participations/${participationId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());
    await expect(
      patchRaffleParticipation(raffleId, participationId, data),
    ).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    await expect(
      patchRaffleParticipation(raffleId, participationId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
