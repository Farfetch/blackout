import { getProgramUsersMembership } from '..';
import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramUsersMembership.fixtures';
import mswServer from '../../../tests/mswServer';

describe('program users client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('getProgramUsersMembership', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = `/loyalty/v1/programs/${programId}/users/membership`;

    it('should handle a client request successfully', async () => {
      mswServer.use(fixtures.success(mockResponseProgramUsersMembership));

      expect.assertions(2);
      await expect(getProgramUsersMembership(programId)).resolves.toStrictEqual(
        mockResponseProgramUsersMembership,
      );
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      expect.assertions(2);
      await expect(
        getProgramUsersMembership(programId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
