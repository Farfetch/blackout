import {
  mockRaffleEstimationResponse,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getRaffleEstimation.fixtures.js';
import getRaffleEstimation from '../getRaffleEstimation.js';
import mswServer from '../../../tests/mswServer.js';

describe('getRaffleEstimation', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}/estimation`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRaffleEstimationResponse));

    await expect(getRaffleEstimation(raffleId)).resolves.toStrictEqual(
      mockRaffleEstimationResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getRaffleEstimation(raffleId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
