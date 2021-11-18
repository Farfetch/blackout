import { getSearchDidYouMean } from '../';
import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getSearchDidYouMean.fixtures';
import moxios from 'moxios';

describe('search did you mean client', () => {
  const query = mockSearchDidYouMeanQuery;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getSearchDidYouMean', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSearchDidYouMeanResponse;

      fixtures.success({
        response,
        query,
      });

      expect.assertions(2);

      await expect(getSearchDidYouMean(query)).resolves.toBe(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/didyoumean?genders=0&genders=1&searchTerms=balenciga',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      fixtures.failure({
        query,
      });

      expect.assertions(2);

      await expect(getSearchDidYouMean(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/didyoumean?genders=0&genders=1&searchTerms=balenciga',
        expectedConfig,
      );
    });
  });
});
