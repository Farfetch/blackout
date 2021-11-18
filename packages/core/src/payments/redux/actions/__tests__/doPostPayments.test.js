import { mockPaymentsResponse } from '../../__fixtures__/postPayments.fixtures';
import { mockStore } from '../../../../../tests';
import doPostPayments from '../doPostPayments';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

const paymentsMockStore = (state = {}) =>
  mockStore({ paymentTokens: reducer() }, state);

const expectedConfig = undefined;
let store;

describe('doPostPayments() action creator', () => {
  const orderId = '123123';
  const postPayments = jest.fn();
  const action = doPostPayments(postPayments);
  const data = {
    something: 'something',
  };

  const expectedPaymentsResult = {
    entities: {
      ...mockPaymentsResponse,
      createdDate: 12345,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = paymentsMockStore();
  });

  it('should create the correct actions for when the order payment procedure fails', async () => {
    const expectedError = new Error('order payment error');

    postPayments.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(orderId, data));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(postPayments).toHaveBeenCalledTimes(1);
      expect(postPayments).toHaveBeenCalledWith(orderId, data, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.POST_PAYMENTS_REQUEST },
          {
            type: actionTypes.POST_PAYMENTS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the order payment procedure is successful', async () => {
    postPayments.mockResolvedValueOnce(mockPaymentsResponse);
    await store.dispatch(action(orderId, data));

    const actionResults = store.getActions();

    expect(postPayments).toHaveBeenCalledTimes(1);
    expect(postPayments).toHaveBeenCalledWith(orderId, data, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.POST_PAYMENTS_REQUEST },
      {
        type: actionTypes.POST_PAYMENTS_SUCCESS,
        meta: { id: orderId },
        payload: expectedPaymentsResult,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.POST_PAYMENTS_SUCCESS,
      }),
    ).toMatchSnapshot('order payment success payload');
  });
});
