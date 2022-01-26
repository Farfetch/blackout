import { mockBagId, mockData, mockResponse } from 'tests/__fixtures__/bags';
import { postBagItem } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postBagItem.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(
      fixtures.success({ bagId: mockBagId, response: mockResponse }),
    );

    expect.assertions(2);

    await expect(postBagItem(mockBagId, mockData)).resolves.toEqual(
      mockResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure({ bagId: mockBagId }));

    expect.assertions(2);

    await expect(postBagItem(mockBagId, mockData)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockData,
      expectedConfig,
    );
  });
});
