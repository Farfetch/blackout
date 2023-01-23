import { getBagOperation } from '..';
import {
  mockBagId,
  mockBagOperation,
  mockBagOperationId,
} from 'tests/__fixtures__/bags';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getBagOperation.fixtures';
import moxios from 'moxios';

describe('getBagOperation', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockBagOperation;

    fixtures.success({
      bagId: mockBagId,
      bagOperationId: mockBagOperationId,
      response,
    });

    await expect(getBagOperation(mockBagId, mockBagOperationId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId, bagOperationId: mockBagOperationId });

    await expect(
      getBagOperation(mockBagId, mockBagOperationId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}/operations/${mockBagOperationId}`,
      expectedConfig,
    );
  });
});
