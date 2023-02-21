import {
  mockBagId,
  mockBagItemData,
  mockResponse,
} from 'tests/__fixtures__/bags';
import { postBagItem } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postBagItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    await expect(postBagItem(mockBagId, mockBagItemData)).resolves.toEqual(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockBagItemData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postBagItem(mockBagId, mockBagItemData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockBagItemData,
      expectedConfig,
    );
  });
});
