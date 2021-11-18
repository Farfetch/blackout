import { deleteSpaceContentVersion } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/deleteContentVersion.fixtures';
import moxios from 'moxios';

describe('deleteContentVersion', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
  const versionId = '1.0';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'delete');
  const endpoint = '/content/v1/spaces';

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ spaceCode, contentId, versionId, response });

    expect.assertions(2);

    await expect(
      deleteSpaceContentVersion(spaceCode, contentId, versionId),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, contentId, versionId });

    expect.assertions(2);

    await expect(
      deleteSpaceContentVersion(spaceCode, contentId, versionId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contents/${contentId}/versions/${versionId}`,
      expectedConfig,
    );
  });
});
