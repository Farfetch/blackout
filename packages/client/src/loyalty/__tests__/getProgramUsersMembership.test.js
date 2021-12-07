import { getProgramUsersMembership } from '../';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getProgramUsersMembership.fixtures';
import moxios from 'moxios';

describe('program users client', () => {
  const programId = '1';
  const data = {
    name: 'string',
  };
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
      const response = { id: 'id', ...data };

      fixtures.success({ programId, response });

      expect.assertions(2);
      await expect(getProgramUsersMembership(programId)).resolves.toBe(
        response,
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
