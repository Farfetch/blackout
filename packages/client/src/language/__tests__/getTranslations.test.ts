import { getTranslations } from '..//index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getTranslations.fixtures.js';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer.js';

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
    jest.clearAllMocks();
  });

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    await expect(getTranslations(query)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      join('/language/v1/search/translations', { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getTranslations(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/language/v1/search/translations', { query }),
      expectedConfig,
    );
  });
});
