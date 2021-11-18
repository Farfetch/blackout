import { doGetBag } from '../';
import {
  mockBagId,
  mockNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: reducer() }, state, mockMiddlewares);
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: reducer() }, state);
const expectedConfig = undefined;

describe('doGetBag() action creator', () => {
  let store;

  const getBag = jest.fn();
  const action = doGetBag(getBag);
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  beforeEach(() => {
    jest.clearAllMocks();
    store = bagMockStore();
  });

  it('should create the correct actions for when the get bag procedure fails', async () => {
    const expectedError = new Error('get bag error');

    getBag.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    try {
      await store.dispatch(action(mockBagId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getBag).toHaveBeenCalledTimes(1);
      expect(getBag).toHaveBeenCalledWith(mockBagId, expectedConfig);
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.GET_BAG_REQUEST },
          {
            type: actionTypes.GET_BAG_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    }
  });

  it('should create the correct actions for when the get bag procedure is successful', async () => {
    getBag.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(mockBagId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledWith(mockBagId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_BAG_REQUEST },
      {
        type: actionTypes.GET_BAG_SUCCESS,
        payload: mockNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_BAG_SUCCESS }),
    ).toMatchSnapshot('get bag success payload');
  });

  it('should create the correct actions for when the get bag procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares();

    getBag.mockResolvedValueOnce(mockResponse);
    await store.dispatch(action(mockBagId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledWith(mockBagId, expectedConfig);
    expect(actionResults).toMatchObject([
      { type: actionTypes.GET_BAG_REQUEST },
      {
        type: actionTypes.GET_BAG_SUCCESS,
        payload: mockNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.GET_BAG_SUCCESS }),
    ).toMatchSnapshot('get bag success payload without receiving options');
  });
});
