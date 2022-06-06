import { getReturnReferences } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getReturnReferences.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReturnReferences', () => {
  const name = 'ReturnNote';
  const spy = jest.spyOn(client, 'get');
  const id = '123456';
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = '';

    fixture.success({
      id,
      name,
      query,
      response,
    });

    expect.assertions(2);
    await expect(getReturnReferences(id, name, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}/references/${name}`, { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, name, query });

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
