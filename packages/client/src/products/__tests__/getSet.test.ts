import { getSet } from '..';
import { mockSet, mockSetId } from 'tests/__fixtures__/products';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSet.fixtures';
import moxios from 'moxios';

describe('getSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockSet;

    fixtures.success({
      slug: mockSetId,
      response,
    });

    expect.assertions(2);

    await expect(getSet(mockSetId, {})).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({
      slug: mockSetId,
      query: {},
    });

    expect.assertions(2);
    await expect(getSet(mockSetId, {})).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sets/${mockSetId}`,
      expectedConfig,
    );
  });
});
