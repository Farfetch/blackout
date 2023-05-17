import { getSearchIntents } from '..//index.js';
import {
  mockSearchIntentsQuery as query,
  mockSearchIntentsResponse as response,
} from 'tests/__fixtures__/search/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSearchIntents.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('search intents client', () => {
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  describe('getSearchIntents', () => {
    const spy = jest.spyOn(client, 'get');

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(response));

      await expect(getSearchIntents(query)).resolves.toEqual(response);

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(getSearchIntents(query)).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(
        '/commerce/v1/search/intent?gender=0&searchTerms=white%20dresses',
        expectedConfig,
      );
    });
  });
});
