import { getReturnWorkflow } from '../index.js';
import {
  getReturnWorkflowResponse,
  id,
} from 'tests/__fixtures__/returns/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getReturnWorkflow.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getReturnWorkflow', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(getReturnWorkflowResponse));

    await expect(getReturnWorkflow(id)).resolves.toStrictEqual(
      getReturnWorkflowResponse,
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}/workflow`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getReturnWorkflow(id)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/returns/${id}/workflow`,
      expectedConfig,
    );
  });
});
