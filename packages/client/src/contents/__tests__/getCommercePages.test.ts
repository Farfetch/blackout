import { CommercePagesType } from '../types/index.js';
import { getCommercePages } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/commercepages.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getCommercePages()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(client, 'get');
  const query = {
    type: CommercePagesType.PRODUCT,
    id: 100200,
  };

  const response = {
    number: 1,
    totalPages: 1,
    totalItems: 1,
    entries: [
      {
        publicationId: '1fa65fb0-49bf-43b3-902e-78d104f160a3',
        publicationDate: '2021-10-28T10:34:01.226Z',
        versionId: '914480a1-21a3-4bb4-8670-40ab113b1a3a',
        spaceCode: 'website',
        metadata: {
          custom: {
            id: 'qew',
            gender: 'wqe',
            brand: 'e2',
            priceType: 'e2',
            category: 'e2z',
          },
        },
        contentTypeCode: 'listing',
        environmentCode: 'live',
        code: 'test',
        ranking: 110,
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
    ],
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.get.success(response));

    await expect(getCommercePages(query)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      '/content/v2/commercepages?id=100200&type=PRODUCT',
      expectedConfig,
    );
  });

  it('should handle a client request error', async () => {
    mswServer.use(fixtures.get.failure());

    await expect(getCommercePages(query)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/content/v2/commercepages?id=100200&type=PRODUCT',
      expectedConfig,
    );
  });
});
