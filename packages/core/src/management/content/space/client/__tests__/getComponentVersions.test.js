import { getSpaceComponentVersions } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getComponentVersions.fixtures';
import moxios from 'moxios';

describe('getComponentVersions', () => {
  const spaceCode = 'emails';
  const componentCode = 'button';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'get');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ spaceCode, componentCode, response });

    expect.assertions(2);

    await expect(
      getSpaceComponentVersions(spaceCode, componentCode),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components/${componentCode}/componentversions`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, componentCode });

    expect.assertions(2);

    await expect(
      getSpaceComponentVersions(spaceCode, componentCode),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components/${componentCode}/componentversions`,
      expectedConfig,
    );
  });
});
