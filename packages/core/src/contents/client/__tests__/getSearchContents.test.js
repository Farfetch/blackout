import { getSearchContents } from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/contents.fixtures';
import moxios from 'moxios';

describe('contents client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSearchContents()', () => {
    const spy = jest.spyOn(client, 'get');
    const query = {
      spaceCode: 'website',
      environmentCode: 'live',
      codes: 123456789,
      contentTypeCode: 'pages',
    };
    const response = {
      number: 1,
      totalPages: 1,
      totalItems: 3,
      entries: [
        {
          publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
          versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
          spaceCode: 'website',
          contentTypeCode: 'pages',
          environmentCode: 'live',
          code: 'cttpage',
          target: {
            contentzone: '10674',
          },
          components: [
            {
              type: 'html',
              content: '',
              name: 'QA HTML Template',
              displayOptions: {},
            },
          ],
        },
        {
          publicationId: '01b7783c-1b9d-4d5d-915b-17a30c85082d',
          versionId: '8402918c-b859-4b5b-8192-d83809bae1d0',
          spaceCode: 'website',
          contentTypeCode: 'pages',
          environmentCode: 'live',
          code: 'boutiques',
          target: {
            contentzone: '10674',
          },
          components: [
            {
              type: 'list',
              components: [
                {
                  type: 'custom',
                  fields: {
                    title: {
                      type: 'text',
                      value: 'Browns South Molton Street',
                      name: 'Title',
                      displayOptions: {},
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    it('should handle a client request successfully', async () => {
      fixtures.get.success({
        queryParams: query,
        response,
      });

      await expect(getSearchContents(query)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(
        '/content/v1/search/contents?codes=123456789&contentTypeCode=pages&environmentCode=live&spaceCode=website',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.get.failure({
        queryParams: query,
      });

      await expect(getSearchContents(query)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(
        '/content/v1/search/contents?codes=123456789&contentTypeCode=pages&environmentCode=live&spaceCode=website',
        expectedConfig,
      );
    });
  });
});
