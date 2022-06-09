import { Charge, DeclineCode, GetChargesStatus } from '../types';
import { getCharges } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getCharges.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getCharges', () => {
  const id = '123456';
  const chargeId = '98776';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');
  const urlToBeCalled = `/payment/v1/intents/${id}/charges/${chargeId}`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response: Charge = {
      status: GetChargesStatus.Processing,
      redirectUrl: 'string',
      returnUrl: 'string',
      cancelUrl: 'string',
      chargeInstruments: [
        {
          id: '00000000-0000-0000-0000-000000000000',
          operationStatus: GetChargesStatus.Processing,
          declineCode: DeclineCode.NotApplicable,
        },
      ],
    };

    mswServer.use(fixtures.success(response));

    expect.assertions(2);
    await expect(getCharges(id, chargeId)).resolves.toStrictEqual(response);

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(getCharges(id, chargeId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
  });
});
