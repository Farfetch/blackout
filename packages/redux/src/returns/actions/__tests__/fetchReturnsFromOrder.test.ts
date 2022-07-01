import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchReturnsFromOrder } from '..';
import { getReturnsFromOrder } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import { mockStore } from '../../../../tests';
import {
  responses,
  returnsFromOrderNormalizedPayload,
} from 'tests/__fixtures__/returns';
import find from 'lodash/find';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getReturnsFromOrder: jest.fn(),
}));

const returnsMockStore = (state = {}) =>
  mockStore({ returns: INITIAL_STATE }, state);

describe('fetchReturnsFromOrder() action creator', () => {
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  let store;
  const orderId = '8VXRHN';

  beforeEach(() => {
    jest.clearAllMocks();
    store = returnsMockStore();
  });

  it('should create the correct actions for when the get return procedure fails', async () => {
    const expectedError = new Error('get return error');

    getReturnsFromOrder.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(fetchReturnsFromOrder(orderId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getReturnsFromOrder).toHaveBeenCalledTimes(1);
      expect(getReturnsFromOrder).toHaveBeenCalledWith(orderId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST },
          {
            type: actionTypes.FETCH_RETURNS_FROM_ORDER_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get return procedure is successful', async () => {
    getReturnsFromOrder.mockResolvedValueOnce(
      responses.getReturnsFromOrder.get.success,
    );
    await store.dispatch(fetchReturnsFromOrder(orderId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getReturnsFromOrder).toHaveBeenCalledTimes(1);
    expect(getReturnsFromOrder).toHaveBeenCalledWith(orderId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_RETURNS_FROM_ORDER_REQUEST },
      {
        type: actionTypes.FETCH_RETURNS_FROM_ORDER_SUCCESS,
        payload: returnsFromOrderNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_RETURN_SUCCESS }),
    ).toMatchSnapshot('get return success payload');
  });
});
