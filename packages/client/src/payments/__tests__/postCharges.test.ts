import { DeclineCode, GetChargesStatus, PostChargesResponse } from '../types';
import { postCharges } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postCharges.fixtures';
import moxios from 'moxios';

describe('post charges', () => {
  const id = '123456';
  const data = {
    returnUrl: '',
    cancelUrl: '',
  };
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response: PostChargesResponse = {
      data: {
        status: GetChargesStatus.Processing,
        redirectUrl: '',
        returnUrl: '',
        cancelUrl: '',
        chargeInstruments: [
          {
            id: '',
            operationStatus: GetChargesStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      },
      headers: { location: '' },
    };

    fixtures.success({ id, data, response });
    expect.assertions(2);
    await expect(postCharges(id, data)).resolves.toMatchObject(response);
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ id, data });
    expect.assertions(2);
    await expect(postCharges(id, data)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
  });
});
