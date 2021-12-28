import { getProgramUsersMembership } from '..';
import {
  mockResponseProgramUsersMembership,
  programId,
} from 'tests/__fixtures__/loyalty';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramUsersMembership.fixtures';
import moxios from 'moxios';

describe('program users client', () => {
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getProgramUsersMembership', () => {
    const spy = jest.spyOn(client, 'get');
    const apiPath = `/loyalty/v1/programs/${programId}/users/membership`;

    it('should handle a client request successfully', async () => {
      fixtures.success({
        programId,
        response: mockResponseProgramUsersMembership,
      });

      expect.assertions(2);
      await expect(getProgramUsersMembership(programId)).resolves.toBe(
        mockResponseProgramUsersMembership,
      );
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixtures.failure({ programId });

      expect.assertions(2);
      await expect(
        getProgramUsersMembership(programId),
      ).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(apiPath, expectedConfig);
    });
  });
});
