import { deleteBagItem } from '..//index.js';
import {
  mockBagId,
  mockBagItemId,
  mockResponse,
} from 'tests/__fixtures__/bags/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteBagItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('deleteBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    await expect(deleteBagItem(mockBagId, mockBagItemId)).resolves.toEqual(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      deleteBagItem(mockBagId, mockBagItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      expectedConfig,
    );
  });
});
