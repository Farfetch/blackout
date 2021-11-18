import { putSpaceComponentVersion } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/putComponentVersion.fixtures';
import moxios from 'moxios';

describe('putComponentVersion', () => {
  const spaceCode = 'emails';
  const componentCode = 'button';
  const versionId = '1.0';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'put');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};
    const data = {};

    fixtures.success({ spaceCode, componentCode, versionId, response });

    expect.assertions(2);

    await expect(
      putSpaceComponentVersion(spaceCode, componentCode, versionId, data),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components/${componentCode}/componentversions/${versionId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    const data = {};

    fixtures.failure({ spaceCode, componentCode, versionId });

    expect.assertions(2);

    await expect(
      putSpaceComponentVersion(spaceCode, componentCode, versionId, data),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/components/${componentCode}/componentversions/${versionId}`,
      data,
      expectedConfig,
    );
  });
});
