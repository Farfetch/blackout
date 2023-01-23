import { getBagOperations } from '..';
import { mockBagId, mockBagOperations } from 'tests/__fixtures__/bags';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getBagOperations.fixtures';
import moxios from 'moxios';

describe('getBagOperations', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockBagOperations;

    fixtures.success({
      bagId: mockBagId,
      query: { sort: 'createdDate:desc' },
      response,
    });

    await expect(
      getBagOperations(mockBagId, { sort: 'createdDate:desc' }),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations?sort=createdDate%3Adesc`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId, query: { sort: 'createdDate:desc' } });

    await expect(
      getBagOperations(mockBagId, { sort: 'createdDate:desc' }),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations?sort=createdDate%3Adesc`,
      expectedConfig,
    );
  });
});
