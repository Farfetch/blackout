import { deleteBagItem } from '../';
import {
  mockBagId,
  mockBagItemId,
  mockResponse,
} from 'tests/__fixtures__/bags';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteBagItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deleteBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(
      fixtures.success({
        bagId: mockBagId,
        bagItemId: mockBagItemId,
        response: mockResponse,
      }),
    );

    expect.assertions(2);

    await expect(deleteBagItem(mockBagId, mockBagItemId)).resolves.toEqual(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(
      fixtures.failure({ bagId: mockBagId, bagItemId: mockBagItemId }),
    );

    expect.assertions(2);

    await expect(
      deleteBagItem(mockBagId, mockBagItemId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      expectedConfig,
    );
  });
});