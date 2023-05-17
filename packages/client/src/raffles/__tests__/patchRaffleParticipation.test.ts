import {
  participationId,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import {
  type PatchRaffleParticipationOperation,
  RaffleParticipationStatus,
} from '../types/index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchRaffleParticipation.fixtures.js';
import mswServer from '../../../tests/mswServer.js';
import patchRaffleParticipation from '../patchRaffleParticipation.js';

describe('patchRaffleParticipation', () => {
  const data: PatchRaffleParticipationOperation[] = [
    {
      value: RaffleParticipationStatus.Cancelled,
      path: '/status',
      op: 'replace',
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
