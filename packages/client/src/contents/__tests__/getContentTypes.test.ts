import { getContentTypes } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/contentTypes.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getContentTypes()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const spy = jest.spyOn(client, 'get');
  const spaceCode = 'website';
  const response = {
    number: 1,
    totalPages: 1,
    totalItems: 2,
    entries: [
      {
        code: 'careers',
        publicationTargetTypes: [
          {
            name: 'contentzone',
            restrictedValues: [],
          },
          {
            name: 'language',
            restrictedValues: [],
          },
          {
            name: 'country',
            restrictedValues: [],
          },
          {
            name: 'benefits',
            restrictedValues: [],
          },
        ],
      },
      {
        code: 'collections',
        publicationTargetTypes: [
          {
            name: 'contentzone',
            restrictedValues: [],
          },
          {
            name: 'language',
            restrictedValues: [],
          },
          {
            name: 'country',
            restrictedValues: [],
          },
          {
            name: 'benefits',
            restrictedValues: [],
          },
        ],
      },
    ],
  };

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(getContentTypes(spaceCode)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });

  it('should handle a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getContentTypes(spaceCode)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });
});
