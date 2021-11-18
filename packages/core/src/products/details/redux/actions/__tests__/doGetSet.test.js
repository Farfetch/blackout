import { doGetSet } from '../';
import {
  mockProduct,
  mockProductId,
  mockSet,
  mockSetId,
} from 'tests/__fixtures__/products';
import { mockStore } from '../../../../../../tests';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const productDetailsMockStore = (state = {}) =>
  mockStore({ details: reducer() }, state, mockMiddlewares);
const productDetailsMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ details: reducer() }, state);

describe('doGetSet() action creator', () => {
  let store;
  const getSet = jest.fn();
  const action = doGetSet(getSet);
  const expectedConfig = undefined;
  const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');

  const newState = {
    entities: {
      products: {
        [mockProductId]: mockProduct,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = productDetailsMockStore(newState);
  });

  it('should create the correct actions for when the get set procedure fails', async () => {
    const expectedError = new Error('Get set error');

    getSet.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(mockSetId));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getSet).toHaveBeenCalledTimes(1);
      expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          meta: { setId: mockSetId },
          type: actionTypes.GET_SET_REQUEST,
        },
        {
          meta: { setId: mockSetId },
          payload: {
            error: expectedError,
          },
          type: actionTypes.GET_SET_FAILURE,
        },
      ]);
    }
  });

  it('should create the correct actions for when the get set procedure is successful', async () => {
    getSet.mockResolvedValueOnce(mockSet);

    await store.dispatch(action(mockSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { setId: mockSetId },
        type: actionTypes.GET_SET_REQUEST,
      },
      {
        meta: { setId: mockSetId },
        payload: expect.any(Object),
        type: actionTypes.GET_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_SET_SUCCESS,
      }),
    ).toMatchSnapshot('Get set success payload');
  });

  it('should create the correct actions for when the get set procedure is successful without receiving options', async () => {
    store = productDetailsMockStoreWithoutMiddlewares(newState);
    getSet.mockResolvedValueOnce(mockSet);

    await store.dispatch(action(mockSetId));

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledTimes(1);
    expect(getSet).toHaveBeenCalledWith(mockSetId, {}, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        meta: { setId: mockSetId },
        type: actionTypes.GET_SET_REQUEST,
      },
      {
        meta: { setId: mockSetId },
        payload: expect.any(Object),
        type: actionTypes.GET_SET_SUCCESS,
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.GET_SET_SUCCESS,
      }),
    ).toMatchSnapshot('Get set success payload without receiving options');
  });
});
