import { getProductOutfits } from '../index.js';
import {
  mockProductId,
  mockProductOutfits,
} from 'tests/__fixtures__/products/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProductOutfits.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getProductOutfits', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductOutfits));

    await expect(getProductOutfits(mockProductId)).resolves.toEqual(
      mockProductOutfits,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/outfits`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductOutfits(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/outfits`,
      expectedConfig,
    );
  });
});
