import * as actionTypes from '../../actionTypes';
import * as normalizr from 'normalizr';
import { fetchBag } from '..';
import { getBag } from '@farfetch/blackout-client';
import { INITIAL_STATE } from '../../reducer';
import {
  mockBagId,
  mockNormalizedPayload,
  mockResponse,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests';
import find from 'lodash/find';
import thunk from 'redux-thunk';

jest.mock('@farfetch/blackout-client', () => ({
  ...jest.requireActual('@farfetch/blackout-client'),
  getBag: jest.fn(),
}));

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const bagMockStore = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state, mockMiddlewares);
const bagMockStoreWithoutMiddlewares = (state = {}) =>
  mockStore({ bag: INITIAL_STATE }, state);
const expectedConfig = undefined;
const expectedQuery = undefined;
const normalizeSpy = jest.spyOn(normalizr, 'normalize');
let store;

describe('fetchBag() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = bagMockStore();
  });

  it('should create the correct actions for when the fetch bag procedure fails', async () => {
    const expectedError = new Error('fetch bag error');

    getBag.mockRejectedValueOnce(expectedError);
    expect.assertions(4);

    await store.dispatch(fetchBag(mockBagId)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getBag).toHaveBeenCalledTimes(1);
      expect(getBag).toHaveBeenCalledWith(
        mockBagId,
        expectedQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actionTypes.FETCH_BAG_REQUEST },
          {
            type: actionTypes.FETCH_BAG_FAILURE,
            payload: { error: expectedError },
          },
        ]),
      );
    });
  });

  it('should create the correct actions for when the fetch bag procedure is successful', async () => {
    getBag.mockResolvedValueOnce(mockResponse);

    expect.assertions(6);

    await store.dispatch(fetchBag(mockBagId)).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledWith(
      mockBagId,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_BAG_REQUEST },
      {
        type: actionTypes.FETCH_BAG_SUCCESS,
        payload: mockNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_BAG_SUCCESS }),
    ).toMatchSnapshot('fetch bag success payload');
  });

  it('should create the correct actions for when the fetch bag procedure is successful without receiving options', async () => {
    store = bagMockStoreWithoutMiddlewares();

    getBag.mockResolvedValueOnce(mockResponse);

    expect.assertions(6);

    await store.dispatch(fetchBag(mockBagId)).then(clientResult => {
      expect(clientResult).toBe(mockResponse);
    });

    const actionResults = store.getActions();

    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledTimes(1);
    expect(getBag).toHaveBeenCalledWith(
      mockBagId,
      expectedQuery,
      expectedConfig,
    );
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_BAG_REQUEST },
      {
        type: actionTypes.FETCH_BAG_SUCCESS,
        payload: mockNormalizedPayload,
      },
    ]);
    expect(
      find(actionResults, { type: actionTypes.FETCH_BAG_SUCCESS }),
    ).toMatchSnapshot('fetch bag success payload without receiving options');
  });
});
