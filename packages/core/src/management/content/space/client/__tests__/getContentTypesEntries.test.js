import { getSpaceContentTypesEntries } from '..';
import client from '../../../../../helpers/client';
import fixtures from '../__fixtures__/getContentTypesEntries.fixtures';
import moxios from 'moxios';

describe('getContentTypesEntries', () => {
  const spaceCode = 'emails';
  const contentTypeCode = 'email';
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

    fixtures.success({ spaceCode, contentTypeCode, response });

    expect.assertions(2);

    await expect(
      getSpaceContentTypesEntries(spaceCode, contentTypeCode),
    ).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contentTypes/${contentTypeCode}/entries`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ spaceCode, contentTypeCode });

    expect.assertions(2);

    await expect(
      getSpaceContentTypesEntries(spaceCode, contentTypeCode),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `${endpoint}/${spaceCode}/contentTypes/${contentTypeCode}/entries`,
      expectedConfig,
    );
  });
});
