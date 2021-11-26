import { mockBagId, mockData, mockResponse } from 'tests/__fixtures__/bags';
import { postBagItem } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postBagItem.fixtures';
import moxios from 'moxios';

describe('postBagItem', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockResponse;

    fixtures.success({ bagId: mockBagId, response });

    expect.assertions(2);

    await expect(postBagItem(mockBagId, mockData)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId });

    expect.assertions(2);

    await expect(postBagItem(mockBagId, mockData)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/items`,
      mockData,
      expectedConfig,
    );
  });
});
