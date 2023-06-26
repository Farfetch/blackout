import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import facetsSchema from '../../../../entities/schemas/facet';

export default getListingFacets => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_LISTING_FACETS_REQUEST,
  });

  try {
    const result = await getListingFacets(query, config);

    dispatch({
      type: actionTypes.GET_LISTING_FACETS_SUCCESS,
      payload: normalize(result, [{ values: [[facetsSchema]] }]),
    });

    return result;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LISTING_FACETS_FAILURE,
      payload: {
        error,
      },
    });

    throw error;
  }
};
