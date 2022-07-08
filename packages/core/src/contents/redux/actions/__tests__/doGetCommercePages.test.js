import {
  commercePagesQuery,
  expectedCommercePagesNormalizedPayload,
  mockCommercePages,
  mockCommercePagesWithPages,
} from 'tests/__fixtures__/contents';
import { doGetCommercePages } from '../';
import { getRankedCommercePage } from '../../../utils';
import { mockStore } from '../../../../../tests';
import { warnDeprecatedMethod } from '../../../../helpers';
import find from 'lodash/find';
import reducer, { actionTypes } from '../../';

jest.mock('../../../utils', () => ({
  buildContentGroupHash: () => 'commerce_pages!woman',
  buildSEOPathname: jest.fn(),
  getRankedCommercePage: jest.fn(),
}));

jest.mock('../../../../helpers', () => ({
  ...jest.requireActual('../../../../helpers'),
  warnDeprecatedMethod: jest.fn(),
}));

const commercePagesMockStore = (state = {}) =>
  mockStore({ contents: reducer() }, state);

const normalizeSpy = jest.spyOn(require('normalizr'), 'normalize');
const expectedConfig = undefined;
let store;

describe('doGetCommercePages() action creator', () => {
  const getCommercePages = jest.fn();
  const action = doGetCommercePages(getCommercePages, 'woman');

  beforeEach(() => {
    jest.clearAllMocks();
    store = commercePagesMockStore();
  });

  it('should create the correct actions for when the get commerce pages procedure fails', async () => {
    const expectedError = new Error('Get commerce pages error');

    getCommercePages.mockRejectedValueOnce(expectedError);

    expect.assertions(4);

    try {
      await store.dispatch(action(commercePagesQuery));
    } catch (error) {
      expect(error).toBe(expectedError);
      expect(getCommercePages).toHaveBeenCalledTimes(1);
      expect(getCommercePages).toHaveBeenCalledWith(
        commercePagesQuery,
        expectedConfig,
      );
      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              type: actionTypes.GET_COMMERCE_PAGES_FAILURE,
            },
            {
              payload: { error: expectedError },
              type: actionTypes.GET_COMMERCE_PAGES_FAILURE,
            },
          ),
        ]),
      );
    }
  });

  it('should create the correct actions for when the get commerce pages procedure is successful', async () => {
    getCommercePages.mockResolvedValueOnce(mockCommercePages);
    getRankedCommercePage.mockResolvedValueOnce(mockCommercePages);

    expect.assertions(6);

    await store.dispatch(action(commercePagesQuery));

    const actionResults = store.getActions();

    expect(warnDeprecatedMethod).toHaveBeenCalledTimes(1);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledWith(
      commercePagesQuery,
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_COMMERCE_PAGES_REQUEST,
          },
          {
            payload: expectedCommercePagesNormalizedPayload,
            type: actionTypes.GET_COMMERCE_PAGES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_COMMERCE_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get commerce pages payload');
  });

  it('commerce page with more than one page', async () => {
    getCommercePages.mockResolvedValue(mockCommercePagesWithPages);
    getRankedCommercePage.mockResolvedValueOnce(mockCommercePages);

    expect.assertions(7);

    await store.dispatch(action(commercePagesQuery));

    const actionResults = store.getActions();

    expect(warnDeprecatedMethod).toHaveBeenCalledTimes(1);
    expect(normalizeSpy).toHaveBeenCalledTimes(1);
    expect(getCommercePages).toHaveBeenCalledTimes(2);
    expect(getCommercePages).toHaveBeenCalledWith(
      commercePagesQuery,
      expectedConfig,
    );
    expect(getCommercePages).toHaveBeenLastCalledWith(
      { ...commercePagesQuery, PageIndex: 2 },
      expectedConfig,
    );
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          {
            type: actionTypes.GET_COMMERCE_PAGES_REQUEST,
          },
          {
            payload: expectedCommercePagesNormalizedPayload,
            type: actionTypes.GET_COMMERCE_PAGES_SUCCESS,
          },
        ),
      ]),
    );
    expect(
      find(actionResults, { type: actionTypes.GET_COMMERCE_PAGES_SUCCESS }),
    ).toMatchSnapshot('Get commerce pages payload');
  });
});
