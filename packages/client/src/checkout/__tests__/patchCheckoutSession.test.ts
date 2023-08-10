import client from '../../helpers/client/index.js';

import patchCheckoutSession from '../patchCheckoutSession.js';

import mswServer from '../../../tests/mswServer.js';

import {
  mockCheckoutSession,
  mockCheckoutSessionId,
} from 'tests/__fixtures__/checkout/checkoutSessions.fixtures.mjs';
import fixtures from '../__fixtures__/patchCheckoutSession.fixtures.js';

import type { PatchCheckoutSessionData } from '../types/index.js';

describe('checkout client', () => {
  const expectedConfig = undefined;

  beforeEach(() => jest.clearAllMocks());

  describe('patchCheckoutSession', () => {
    const data: PatchCheckoutSessionData = {
      email: 'test.email@test.com',
    };

    const spy = jest.spyOn(client, 'patch');
    const urlToBeCalled = `/checkout/v1/checkoutSessions/${mockCheckoutSessionId}`;

    it('should handle a client request successfully', async () => {
      const response = mockCheckoutSession;

      mswServer.use(fixtures.success(response));

      await expect(
        patchCheckoutSession(mockCheckoutSessionId, data),
      ).resolves.toStrictEqual(response);

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });

    it('should receive a client request error', async () => {
      mswServer.use(fixtures.failure());

      await expect(
        patchCheckoutSession(mockCheckoutSessionId, data),
      ).rejects.toMatchSnapshot();

      expect(spy).toHaveBeenCalledWith(urlToBeCalled, data, expectedConfig);
    });
  });
});
