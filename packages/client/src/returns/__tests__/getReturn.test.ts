import { getReturn } from '..';
import { id, responses } from 'tests/__fixtures__/returns';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getReturn.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getReturn', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getReturn(id)).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(getReturn(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      expectedConfig,
    );
  });
});
