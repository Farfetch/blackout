import { buildQueryStringFromObject } from '../helpers/index.js';
import { contentEntries } from '../entities/schemas/content.js';
import { generateContentHash } from './utils.js';
import { get, merge } from 'lodash-es';
import { INITIAL_STATE_CONTENT } from './reducer.js';
import { normalize } from 'normalizr';
import parse from 'url-parse';
import type { ContentsState } from './types/index.js';
import type { ServerInitialState } from '../types/serverInitialState.types.js';

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

  const { searchContentRequests, slug, seoMetadata, subfolder } = model;

  const contents = searchContentRequests.reduce((acc, item) => {
    const {
      filters: { codes, contentTypeCode },
      searchResponse,
    } = item;

    const hash = generateContentHash({
      codes,
      contentTypeCode,
    });

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

  const url = subfolder !== '/' ? slug?.replace(subfolder, '') : slug;
  const { pathname, query } = parse(url, true);

  delete query.json;

  const metadataHash = `${pathname}${buildQueryStringFromObject(query)}`;

  const metadata = {
    contents: {
      metadata: {
        isLoading: {
          [metadataHash]: false,
        },
        error: {},
        result: {
          [metadataHash]: {
            ...seoMetadata,
          },
        },
      },
    } as ContentsState,
  };

  const total = merge(contents, metadata);

  return total;
};

export default serverInitialState;
