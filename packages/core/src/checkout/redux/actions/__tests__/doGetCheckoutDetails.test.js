import {
  checkoutId,
  expectedDetailsNormalizedPayload,
  mockDetailsResponse,
} from '../../__fixtures__/checkout.fixtures';
import { mockStore } from '../../../../../tests';
import doGetCheckoutDetails from '../doGetCheckoutDetails';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('doGetCheckoutDetails() action creator', () => {
  const checkoutMockStore = (state = {}) =>
    mockStore({ checkout: reducer() }, state);
  const getCheckoutDetails = jest.fn();
  const action = doGetCheckoutDetails(getCheckoutDetails);
  const query = {
    orderId: '12345667',
    paymentrequestguid: '02f21cbc-2f55-43f5-8a85-c624a70cd2ab',
    token: 'EC-84B89991T1463330B',
    PayerID: 'GWB9GG3ZHEQWN',
  };
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
  const expectedConfig = undefined;
  let store;

  beforeEach(() => {
    jest.clearAllMocks();
    store = checkoutMockStore();
  });

  it('should create the correct actions for when the get checkout details procedure fails', async () => {
    const expectedError = new Error('get checkout details error');

    getCheckoutDetails.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(checkoutId, query));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCheckoutDetails).toHaveBeenCalledTimes(1);
      expect(getCheckoutDetails).toHaveBeenCalledWith(
        checkoutId,
        query,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_CHECKOUT_DETAILS_REQUEST },
          {
            type: actionTypes.GET_CHECKOUT_DETAILS_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get checkout details procedure is successful', async () => {
    getCheckoutDetails.mockResolvedValueOnce(mockDetailsResponse);
    await store.dispatch(action(checkoutId, query));

    const actionResults = store.getActions();

    expect.assertions(5);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCheckoutDetails).toHaveBeenCalledTimes(1);
    expect(getCheckoutDetails).toHaveBeenCalledWith(
      checkoutId,
      query,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_CHECKOUT_DETAILS_REQUEST },
      {
        meta: { id: checkoutId },
        type: actionTypes.GET_CHECKOUT_DETAILS_SUCCESS,
        payload: expectedDetailsNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_CHECKOUT_DETAILS_SUCCESS,
      }),
    ).toMatchSnapshot('get checkout details success payload');
  });
});
