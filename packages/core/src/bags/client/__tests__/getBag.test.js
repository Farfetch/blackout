import { getBag } from '../';
import { mockBagId, mockResponse } from 'tests/__fixtures__/bags';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getBag.fixtures';
import moxios from 'moxios';

describe('getBag', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockResponse;

    fixtures.success({ bagId: mockBagId, response });

    expect.assertions(2);

    await expect(getBag(mockBagId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ bagId: mockBagId });

    expect.assertions(2);

    await expect(getBag(mockBagId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/bags/${mockBagId}?hydrate=true`,
      expectedConfig,
    );
  });
});
