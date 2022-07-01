import { id, mockPatchData, responses } from 'tests/__fixtures__/returns';
import { patchReturn } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/patchReturn.fixtures';
import mswServer from '../../../tests/mswServer';

describe('patchReturn', () => {
  const spy = jest.spyOn(client, 'patch');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = responses.get.success;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(patchReturn(id, mockPatchData)).resolves.toStrictEqual(
      response,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      mockPatchData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);
    await expect(patchReturn(id, mockPatchData)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}`,
      mockPatchData,
      expectedConfig,
    );
  });
});
