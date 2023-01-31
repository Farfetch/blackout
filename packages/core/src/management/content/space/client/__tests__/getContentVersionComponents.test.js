import { getSpaceContentVersionComponents } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getContentVersionComponents.fixtures';
import moxios from 'moxios';

describe('getContentVersionComponents', () => {
  const spaceCode = 'emails';
  const templateId = 'welcome';
  const versionId = '1.0';
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

    fixtures.success({ spaceCode, templateId, versionId, response });

    expect.assertions(2);

    await expect(
      getSpaceContentVersionComponents(spaceCode, templateId, versionId),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${templateId}/versions/${versionId}/components`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, templateId, versionId });

    expect.assertions(2);

    await expect(
      getSpaceContentVersionComponents(spaceCode, templateId, versionId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${templateId}/versions/${versionId}/components`,
      expectedConfig,
    );
  });
});
