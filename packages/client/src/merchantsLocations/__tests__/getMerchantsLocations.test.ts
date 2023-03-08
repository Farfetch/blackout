import { getMerchantsLocations } from '../index.js';
import {
  mockMerchantLocation,
  mockQuery,
} from 'tests/__fixtures__/merchantsLocations/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getMerchantsLocations.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getMerchantsLocations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = [mockMerchantLocation];

    mswServer.use(fixtures.success(response));

    await expect(getMerchantsLocations(mockQuery)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getMerchantsLocations(mockQuery)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/merchantsLocations?merchantIds=1111%7C9359&merchantLocationIds=2222%7C1467',
      expectedConfig,
    );
  });
});
