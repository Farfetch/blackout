import { getSearchIntents } from '../';
import {
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
} from 'tests/__fixtures__/search';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSearchIntents.fixtures';
import mswServer from '../../../tests/mswServer';

describe('search intents client', () => {
  const expectedConfig = undefined;
  const query = mockSearchIntentsQuery;

  beforeEach(jest.clearAllMocks);

  describe('getSearchIntents', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      const response = mockSearchIntentsResponse;

      mswServer.use(fixtures.success(response));
      expect.assertions(2);

      await expect(getSearchIntents(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());
      expect.assertions(2);

      await expect(getSearchIntents(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });
  });
});
