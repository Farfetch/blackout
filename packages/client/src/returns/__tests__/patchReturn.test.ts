import { mockPatchData, responses } from 'tests/__fixtures__/returns';
import { patchReturn } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchReturn.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('patchReturn', () => {
  const data = mockPatchData;
  const spy = jest.spyOn(client, 'patch');
  const id = 123456;
  const expectedConfig = undefined;
  const query = { guestUserEmail: 'test@email.com' };

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(patchReturn(id, data, query)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(patchReturn(id, data, query)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      join(`/account/v1/returns/${id}`, { query }),
      data,
      expectedConfig,
    );
  });
});
