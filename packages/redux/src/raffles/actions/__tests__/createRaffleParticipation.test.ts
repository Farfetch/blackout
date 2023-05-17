import * as actionTypes from '../../actionTypes.js';
import { INITIAL_STATE } from '../../reducer.js';
import {
  mockCreateRaffleParticipationsNormalizedPayload,
  mockRaffleParticipationResponse,
  raffleId,
} from 'tests/__fixtures__/raffles/index.mjs';
import { mockStore } from '../../../../tests/index.js';
import { postRaffleParticipation } from '@farfetch/blackout-client';
import createRaffleParticipation from '../createRaffleParticipation.js';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  postRaffleParticipation: jest.fn(),
}));

const raffleParticipationMockStore = (state = {}) =>
  mockStore({ result: INITIAL_STATE }, state);

const expectedConfig = undefined;
let store: ReturnType<typeof raffleParticipationMockStore>;

describe('createRaffleParticipation() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = raffleParticipationMockStore();
  });

  const data = {
    userId: '123',
    billingAddressId: '333',
    shippingAddressId: '3929',
    productVariantId: '1404',
    paymentTokenId: '123',
    trackingCorrelationId: null,
  };

  it('should create the correct actions for when the create raffle participation procedure fails', async () => {
    const expectedError = new Error('participation error');

    (postRaffleParticipation as jest.Mock).mockRejectedValueOnce(expectedError);

    await expect(async () => {
      await createRaffleParticipation(raffleId, data)(store.dispatch);
    }).rejects.toThrow(expectedError);
    expect(postRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(postRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId },
      },
      {
        meta: { raffleId },
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_FAILURE,
        payload: { error: expectedError },
      },
    ]);
  });

  it('should create the correct actions for when the create raffle participation procedure is successful', async () => {
    (postRaffleParticipation as jest.Mock).mockResolvedValueOnce(
      mockRaffleParticipationResponse,
    );
    await createRaffleParticipation(raffleId, data)(store.dispatch);

    expect(postRaffleParticipation).toHaveBeenCalledTimes(1);
    expect(postRaffleParticipation).toHaveBeenCalledWith(
      raffleId,
      data,
      expectedConfig,
    );
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_REQUEST,
        meta: { raffleId },
      },
      {
        meta: {
          raffleId,
          participationId:
            mockCreateRaffleParticipationsNormalizedPayload.result,
        },
        type: actionTypes.CREATE_RAFFLE_PARTICIPATION_SUCCESS,
        payload: mockCreateRaffleParticipationsNormalizedPayload,
      },
    ]);
  });
});
