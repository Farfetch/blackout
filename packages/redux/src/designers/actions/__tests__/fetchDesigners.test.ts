import { actionTypes } from '../..';
import { fetchDesigners } from '..';
import { getDesigners } from '@farfetch/blackout-client/designers';
import { INITIAL_STATE } from '../../reducer';
import {
  mockDesignersModel,
  mockHash,
  mockQuery,
  mockState,
} from 'tests/__fixtures__/designers';
import { mockStore } from '../../../../tests';

jest.mock('@farfetch/blackout-client/designers', () => ({
  ...jest.requireActual('@farfetch/blackout-client/designers'),
  getDesigners: jest.fn(),
}));

const designersMockStore = (state = {}) =>
  mockStore({ designers: INITIAL_STATE }, state);
const expectedConfig = undefined;
let store;

describe('fetchDesigners() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = designersMockStore();
  });

  it('should create the correct actions for when the fetch designers procedure fails', async () => {
    const expectedError = new Error('Fetch designers error');

    getDesigners.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    await store.dispatch(fetchDesigners(mockQuery)).catch(error => {
      expect(error).toBe(expectedError);
      expect(getDesigners).toHaveBeenCalledTimes(1);
      expect(getDesigners).toHaveBeenCalledWith(mockQuery, expectedConfig);
      expect(store.getActions()).toEqual([
        {
          type: actionTypes.SET_DESIGNERS_RESULT_HASH,
          meta: { hash: mockHash },
        },
        {
          type: actionTypes.RESET_DESIGNERS_STATE,
        },
        {
          type: actionTypes.FETCH_DESIGNERS_REQUEST,
          meta: { hash: mockHash },
        },
        {
          payload: { error: expectedError },
          meta: { hash: mockHash },
          type: actionTypes.FETCH_DESIGNERS_FAILURE,
        },
      ]);
    });
  });

  it('should create the correct actions for when the fetch designers procedure is successful', async () => {
    getDesigners.mockResolvedValueOnce(mockDesignersModel);

    expect.assertions(4);

    await store.dispatch(fetchDesigners(mockQuery)).then(clientResult => {
      expect(clientResult).toBe(mockDesignersModel);
    });

    expect(getDesigners).toHaveBeenCalledTimes(1);
    expect(getDesigners).toHaveBeenCalledWith(mockQuery, expectedConfig);
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_DESIGNERS_RESULT_HASH,
        meta: { hash: mockHash },
      },
      {
        type: actionTypes.RESET_DESIGNERS_STATE,
      },
      {
        type: actionTypes.FETCH_DESIGNERS_REQUEST,
        meta: { hash: mockHash },
      },
      {
        payload: { result: mockDesignersModel },
        meta: { hash: mockHash },
        type: actionTypes.FETCH_DESIGNERS_SUCCESS,
      },
    ]);
  });

  it('should return if designers result already exists and useCache flag is true', async () => {
    store = designersMockStore(mockState);
    expect.assertions(2);

    await store.dispatch(fetchDesigners(mockQuery, true));

    expect(getDesigners).not.toHaveBeenCalled();
    expect(store.getActions()).toEqual([
      {
        type: actionTypes.SET_DESIGNERS_RESULT_HASH,
        meta: { hash: mockHash },
      },
    ]);
  });
});
