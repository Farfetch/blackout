import {
  mockBagId,
  mockBagItemData,
  mockBagItemId,
  mockResponse,
} from 'tests/__fixtures__/bags/index.mjs';
import { patchBagItem } from '..//index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchBagItem.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('patchBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'patch');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    await expect(
      patchBagItem(mockBagId, mockBagItemId, mockBagItemData),
    ).resolves.toEqual(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      mockBagItemData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      patchBagItem(mockBagId, mockBagItemId, mockBagItemData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      mockBagItemData,
      expectedConfig,
    );
  });
});
