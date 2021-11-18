import { getReferences } from '..';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/getReferences.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getReferences', () => {
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
    const response = {};

    fixture.success({
      id,
      name,
      response,
      query,
    });

    expect.assertions(2);
    await expect(getReferences(id, name, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/legacy/v1/returns/${id}/references/${name}`, { query }),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, name, query });

    expect.assertions(2);
    await expect(getReferences(id, name, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/legacy/v1/returns/${id}/references/${name}`, { query }),
      expectedConfig,
    );
  });
});
