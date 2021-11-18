// @TODO: Remove this file in version 2.0.0.
import { mockStore } from '../../../../../tests';
import fetchSiteFeatures from '../fetchSiteFeatures';
import find from 'lodash/find';
import reducer, { actionTypes } from '../..';

describe('fetchSiteFeatures() action creator', () => {
  const siteFeaturesMockStore = (state = {}) =>
    mockStore({ siteFeatures: reducer() }, state);

  const getSiteFeatures = jest.fn();
  const action = fetchSiteFeatures(getSiteFeatures);

  let store;

  const query = undefined;
  const config = undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    store = siteFeaturesMockStore();
  });

  it('should create the correct actions for when the get siteFeatures procedure fails', async () => {
    const expectedError = new Error('get siteFeatures error');
    getSiteFeatures.mockRejectedValueOnce(expectedError);

    const res = await store.dispatch(action());

    expect.assertions(4);
    expect(res.payload.error).toBe(expectedError);
    expect(getSiteFeatures).toHaveBeenCalledTimes(1);
    expect(getSiteFeatures).toHaveBeenCalledWith(query, config);
    expect(store.getActions()).toEqual(
      expect.arrayContaining([
        { type: actionTypes.FETCH_SITE_FEATURES_REQUEST },
        {
          type: actionTypes.FETCH_SITE_FEATURES_FAILURE,
          payload: { error: expectedError },
        },
      ]),
    );
  });

  it('should create the correct actions for when the get siteFeatures procedure is successful', async () => {
    getSiteFeatures.mockResolvedValueOnce({});
    await store.dispatch(action());

    const actionResults = store.getActions();

    expect.assertions(4);
    expect(getSiteFeatures).toHaveBeenCalledTimes(1);
    expect(getSiteFeatures).toHaveBeenCalledWith(query, config);
    expect(actionResults).toMatchObject([
      { type: actionTypes.FETCH_SITE_FEATURES_REQUEST },
      {
        type: actionTypes.FETCH_SITE_FEATURES_SUCCESS,
        payload: {},
      },
    ]);
    expect(
      find(actionResults, {
        type: actionTypes.FETCH_SITE_FEATURES_SUCCESS,
      }),
    ).toMatchSnapshot('get siteFeatures success payload');
  });
});
