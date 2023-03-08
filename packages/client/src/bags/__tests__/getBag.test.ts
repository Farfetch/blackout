import { getBag } from '..//index.js';
import { mockBagId, mockResponse } from 'tests/__fixtures__/bags/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getBag.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getBag', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockResponse));

    await expect(getBag(mockBagId)).resolves.toEqual(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getBag(mockBagId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });
});
