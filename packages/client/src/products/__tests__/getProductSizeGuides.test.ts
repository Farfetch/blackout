import { getProductSizeGuides } from '..';
import {
  mockProductId,
  mockProductSizeGuides,
} from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProductSizeGuides.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getProductSizeGuides', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockProductSizeGuides));

    await expect(getProductSizeGuides(mockProductId)).resolves.toEqual(
      mockProductSizeGuides,
    );
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getProductSizeGuides(mockProductId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/products/${mockProductId}/sizeguides`,
      expectedConfig,
    );
  });
});
