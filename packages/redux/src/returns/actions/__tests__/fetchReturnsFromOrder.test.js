import * as normalizr from 'normalizr';
import { mockStore } from '../../../../tests';
import {
  responses,
  returnsFromOrderNormalizedPayload,
} from 'tests/__fixtures__/returns';
import fetchReturnsFromOrder from '../../actions/fetchReturnsFromOrder';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const returnsMockStore = (state = {}) =>
  mockStore({ returns: reducer() }, state);

describe('fetchReturnsFromOrder action creator', () => {
  const query = {};
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(normalizr, 'normalize');
  let store;

  const getReturnsFromOrder = jest.fn();
  const action = fetchReturnsFromOrder(getReturnsFromOrder);
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
      await store.dispatch(action(orderId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getReturnsFromOrder).toHaveBeenCalledTimes(1);
      expect(getReturnsFromOrder).toHaveBeenCalledWith(
        orderId,
        query,
        expectedConfig,
      );
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
    await store.dispatch(action(orderId, query));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getReturnsFromOrder).toHaveBeenCalledTimes(1);
    expect(getReturnsFromOrder).toHaveBeenCalledWith(
      orderId,
      query,
      expectedConfig,
    );
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
