import { deleteBagItem } from '../';
import {
  mockBagId,
  mockBagItemId,
  mockResponse,
} from 'tests/__fixtures__/bags';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteBagItem.fixtures';
import moxios from 'moxios';

describe('deleteBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockResponse;

    fixtures.success({
      bagId: mockBagId,
      bagItemId: mockBagItemId,
      response,
    });

    expect.assertions(2);

    await expect(deleteBagItem(mockBagId, mockBagItemId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items/${mockBagItemId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId, bagItemId: mockBagItemId });

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
