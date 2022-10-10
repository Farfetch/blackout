import { getSearchContents } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/contents.fixtures';
import mswServer from '../../../tests/mswServer';

describe('contents client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSearchContents()', () => {
    const spy = jest.spyOn(client, 'get');
    const query = {
      spaceCode: 'website',
      environmentCode: 'live',
      codes: '123456789',
      contentTypeCode: 'pages',
      target: {
        channel: 'channel',
        language: 'en-US',
      },
    };
    const response = {
      number: 1,
      totalPages: 1,
      totalItems: 2,
      entries: [
        {
          publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
          publicationDate: '2021-10-28T10:34:01.226Z',
          versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
          spaceCode: 'website',
          metadata: {},
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
          publicationDate: '2021-10-28T10:34:01.226Z',
          versionId: '8402918c-b859-4b5b-8192-d83809bae1d0',
          spaceCode: 'website',
          metadata: {},
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
                      value: 'South Molton Street',
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
      mswServer.use(fixtures.get.success(response));

      expect.assertions(2);

      await expect(getSearchContents(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/search/contents?codes=123456789&contentTypeCode=pages&environmentCode=live&spaceCode=website&target.channel=channel&target.language=en-US',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.get.failure());

      expect.assertions(2);

      await expect(getSearchContents(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/content/v1/search/contents?codes=123456789&contentTypeCode=pages&environmentCode=live&spaceCode=website&target.channel=channel&target.language=en-US',
        expectedConfig,
      );
    });
  });
});
