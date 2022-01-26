import { getBag } from '../';
import { mockBagId, mockResponse } from 'tests/__fixtures__/bags';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getBag.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getBag', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(
      fixtures.success({ bagId: mockBagId, response: mockResponse }),
    );

    expect.assertions(2);

    await expect(getBag(mockBagId)).resolves.toEqual(mockResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure({ bagId: mockBagId }));

    expect.assertions(2);

    await expect(getBag(mockBagId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });
});
