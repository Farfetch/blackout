import {
  mockRaffleResponse,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getRaffle.fixtures.js';
import getRaffle from '../getRaffle.js';
import mswServer from '../../../tests/mswServer.js';

describe('getRaffle', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/checkout/v1/raffles/${raffleId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockRaffleResponse));

    await expect(getRaffle(raffleId)).resolves.toStrictEqual(
      mockRaffleResponse,
    );

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getRaffle(raffleId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
