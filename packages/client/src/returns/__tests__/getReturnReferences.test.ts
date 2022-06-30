import { getReturnReferences } from '..';
import { mockReturnId as id } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturnReferences.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getReturnReferences', () => {
  const name = 'ReturnNote';
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = '';

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getReturnReferences(id, name, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/references/${name}`, { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(
      getReturnReferences(id, name, query),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/references/${name}`, { query }),
      expectedConfig,
    );
  });
});
