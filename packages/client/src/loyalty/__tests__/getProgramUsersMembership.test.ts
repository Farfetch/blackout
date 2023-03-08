import { getProgramUsersMembership } from '../index.js';
import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getProgramUsersMembership.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('program users client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getProgramUsersMembership', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = `/loyalty/v1/programs/${programId}/users/membership`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockResponseProgramUsersMembership));

      await expect(getProgramUsersMembership(programId)).resolves.toStrictEqual(
        mockResponseProgramUsersMembership,
      );
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        getProgramUsersMembership(programId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
