import { mockPostData, responses } from 'tests/__fixtures__/returns';
import { postReturn } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/postReturn.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('postReturn()', () => {
  const data = mockPostData;
  const spy = jest.spyOn(client, 'post');
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = responses.post.success;

    fixture.success({ data, query, response });

    expect.assertions(2);
    await expect(postReturn(data, query)).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixture.failure({ data, query });

    expect.assertions(2);
    await expect(postReturn(data, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/returns/', { query }),
      data,
      expectedConfig,
    );
  });
});
