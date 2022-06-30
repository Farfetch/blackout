import { getSearchDidYouMean } from '..';
import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
} from 'tests/__fixtures__/search';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSearchDidYouMean.fixtures';
import mswServer from '../../../tests/mswServer';

describe('search did you mean client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSearchDidYouMean', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockSearchDidYouMeanResponse));
      expect.assertions(2);

      await expect(
        getSearchDidYouMean(mockSearchDidYouMeanQuery),
      ).resolves.toEqual(mockSearchDidYouMeanResponse);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/didyoumean?genders=0&genders=1&searchTerms=balenciga',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(
        getSearchDidYouMean(mockSearchDidYouMeanQuery),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/didyoumean?genders=0&genders=1&searchTerms=balenciga',
        expectedConfig,
      );
    });
  });
});
