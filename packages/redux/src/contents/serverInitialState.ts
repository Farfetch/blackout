import { contentEntries } from '../entities/schemas/content';
import { generateContentHash } from './utils';
import { INITIAL_STATE_CONTENT } from './reducer';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import merge from 'lodash/merge';
import type { ServerInitialState } from '../types/serverInitialState.types';

/**
 * Converts server data from searchContents to store state.
 *
 * @param page - Params from the `page` object injected by the server.
 *
 * @returns Initial state for the contents reducer.
 */
const serverInitialState: ServerInitialState = ({ model }) => {
  if (!get(model, 'searchContentRequests')) {
    return { contents: INITIAL_STATE_CONTENT };
  }

  const { searchContentRequests } = model;

  return searchContentRequests.reduce((acc, item) => {
    const {
      filters: { codes, contentTypeCode },
      searchResponse,
    } = item;

    const hash = generateContentHash({ codes, contentTypeCode });

    const { entities, result } = {
      ...normalize({ hash, ...searchResponse }, contentEntries),
    };

    return merge(acc, {
      entities,
      contents: {
        searchResults: {
          [hash]: {
            result,
            isLoading: false,
            error: null,
          },
        },
      },
    });
  }, {});
};

export default serverInitialState;
