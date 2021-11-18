import { deleteSpaceContent } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/deleteContent.fixtures';
import moxios from 'moxios';

describe('deleteContent', () => {
  const spaceCode = 'emails';
  const contentId = 'welcome';
  const expectedConfig = {
    baseURL: 'https://api.blackandwhite-ff.com',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = {};

    fixtures.success({ spaceCode, contentId, response });

    expect.assertions(2);

    await expect(deleteSpaceContent(spaceCode, contentId)).resolves.toBe(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contents/${contentId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, contentId });

    expect.assertions(2);

    await expect(
      deleteSpaceContent(spaceCode, contentId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contents/${contentId}`,
      expectedConfig,
    );
  });
});
