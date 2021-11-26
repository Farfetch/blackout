import { contentEntries } from '../entities/schemas/content';
import { generateContentHash } from './utils';
import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import get from 'lodash/get';
import merge from 'lodash/merge';
import type { Model } from '../types';
import type { ServerInitialState } from './types';

/**
 * Converts server data from searchContents to store state.
 *
 * @param {object} page - Params from the `page` object injected by the server.
 * @param {object} page.model - Page model.
 *
 * @returns {object} Initial state for the contents reducer.
 */
const serverInitialState = ({
  model,
}: {
  model: Model;
}): ServerInitialState => {
  if (!get(model, 'searchContentRequests')) {
    return { contents: INITIAL_STATE };
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
  }, {} as { entities: Record<string, never> });
};

export default serverInitialState;
