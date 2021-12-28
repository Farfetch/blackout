import { mockStore } from '../../../../tests';
import { responses } from 'tests/__fixtures__/returns';
import fetchPickupCapabilities from '../fetchPickupCapabilities';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('fetchPickupCapabilities action creator', () => {
  const pickupDay = 154992960000;
  const queryParams = {
    pickupDay,
    guestOrderId: '12345',
    guestUserEmail: 'test@test.com',
  };

  const expectedConfig = undefined;
  let store;

  const getPickupCapabilities = jest.fn();
  const action = fetchPickupCapabilities(getPickupCapabilities);
  const returnId = 5926969;
  const expectedQueryParams = {
    ...queryParams,
    pickupDay: '1974-11-29',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get pickup capabilities procedure fails', async () => {
    const expectedError = new Error('get pickup capabilities error');

    getPickupCapabilities.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(returnId, queryParams));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getPickupCapabilities).toHaveBeenCalledTimes(1);
      expect(getPickupCapabilities).toHaveBeenCalledWith(
        returnId,
        expectedQueryParams,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST,
          },
          {
            type: actionTypes.FETCH_PICKUP_CAPABILITIES_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get pickup capabilities procedure is successful', async () => {
    const payload = {
      entities: {
        availableEndHours: [
          1549987200000, 1549990800000, 1549994400000, 1549998000000,
          1550001600000, 1550005200000, 1550008800000, 1550012400000,
        ],
        availableStartHours: [
          1549962000000, 1549965600000, 1549969200000, 1549972800000,
          1549976400000, 1549980000000, 1549983600000, 1549987200000,
        ],
        availableTimeSlots: [
          {
            start: 1549987200000,
            end: 1549962000000,
          },
          {
            start: 1549987200000,
            end: 1549965600000,
          },
          {
            start: 1549987200000,
            end: 1549969200000,
          },
          {
            start: 1549987200000,
            end: 1549972800000,
          },
          {
            start: 1549987200000,
            end: 1549976400000,
          },
        ],
        pickupDate: 1549929600000,
      },
    };

    getPickupCapabilities.mockResolvedValueOnce(
      responses.getPickupCapabilities.success,
    );
    await store.dispatch(action(returnId, queryParams));

    const actionResults = store.getActions();

    expect(getPickupCapabilities).toHaveBeenCalledTimes(1);
    expect(getPickupCapabilities).toHaveBeenCalledWith(
      returnId,
      expectedQueryParams,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_PICKUP_CAPABILITIES_REQUEST },
      {
        meta: { id: returnId },
        payload,
        type: actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_PICKUP_CAPABILITIES_SUCCESS,
      }),
    ).toMatchSnapshot('fetch pickup capabilities success payload');
  });
});
