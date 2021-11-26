import { DeclineCode, GetChargesResponse, GetChargesStatus } from '../types';
import { getCharges } from '..';
import client from '../../helpers/client';
import fixture from '../__fixtures__/getCharges.fixtures';
import moxios from 'moxios';

describe('checkout client', () => {
  const id = 123456;
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  describe('getCharges', () => {
    const spy = jest.spyOn(client, 'get');
    const urlToBeCalled = `/checkout/v1/orders/${id}/charges`;

    it('should handle a client request successfully', async () => {
      const response: GetChargesResponse = {
        chargeId: 'string',
        status: GetChargesStatus.Processing,
        redirectUrl: 'string',
        returnUrl: 'string',
        cancelUrl: 'string',
        chargeInstruments: [
          {
            id: 'string',
            operationStatus: GetChargesStatus.Processing,
            declineCode: DeclineCode.NotApplicable,
          },
        ],
      };
      fixture.success({ id, response });
      expect.assertions(2);
      await expect(getCharges(id)).resolves.toBe(response);
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });

    it('should receive a client request error', async () => {
      fixture.failure({ id });
      expect.assertions(2);
      await expect(getCharges(id)).rejects.toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(urlToBeCalled, expectedConfig);
    });
  });
});
