import { getTranslations } from '../';
import client from '../../../helpers/client';
import fixtures from '../__mocks__/getTranslations.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getTranslations', () => {
  const expectedConfig = undefined;
  const query = {
    keys: ['test'],
    projectExternalId: '10000',
    subProjectExternalId: '10000',
  };
  const response = {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        tenantId: 10000,
        clientId: 1,
        projectExternalId: '10000',
        subProjectExternalId: '10000',
        key: 'test',
        language: 'en-US',
        text: 'Test',
        createdDate: '2022-01-18T11:52:35.941Z',
        updatedDate: '2022-01-18T11:52:35.941Z',
        status: 'Undefined',
      },
    ],
  };
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(query, response);

    await expect(getTranslations(query)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/language/v1/search/translations', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(query);

    await expect(getTranslations(query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/language/v1/search/translations', { query }),
      expectedConfig,
    );
  });
});
