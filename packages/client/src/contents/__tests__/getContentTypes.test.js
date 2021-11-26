import { getContentTypes } from '../';
import client from '../../helpers/client';
import fixture from '../__fixtures__/contentTypes.fixtures';
import moxios from 'moxios';

describe('getContentTypes()', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

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
    fixture.get.success({ spaceCode, response });

    expect.assertions(2);

    await expect(getContentTypes(spaceCode)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });

  it('should handle a client request error', async () => {
    fixture.get.failure({ spaceCode });

    expect.assertions(2);

    await expect(getContentTypes(spaceCode)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/content/v1/spaces/${spaceCode}/contentTypes`,
      expectedConfig,
    );
  });
});
