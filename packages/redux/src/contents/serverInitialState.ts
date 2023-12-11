import {
  applyCommercePagesRankingStrategy,
  generateContentHash,
} from './utils.js';
import { buildQueryStringFromObject } from '../helpers/index.js';
import { contentEntries } from '../entities/schemas/content.js';
import { type ContentsState } from './types/index.js';
import { get, merge } from 'lodash-es';
import { INITIAL_STATE_CONTENT } from './reducer.js';
import { normalize } from 'normalizr';
import parse from 'url-parse';
import type { ServerInitialState } from '../types/serverInitialState.types.js';

/**
 * Converts server data from searchContents to store state.
 *
 * @param page - Params from the `page` object injected by the server.
 *
 * @returns Initial state for the contents reducer.
 */
const serverInitialState: ServerInitialState = ({ model, strategy }) => {
  if (!get(model, 'searchContentRequests')) {
    return { contents: INITIAL_STATE_CONTENT };
  }

  const { searchContentRequests, slug, seoMetadata, subfolder } = model;
  const url = subfolder !== '/' ? slug?.replace(subfolder, '') : slug;
  const normalizedUrl = url
    ?.replace('?json=true', '')
    .replace('&json=true', '');

  const contents = searchContentRequests.reduce((acc, item) => {
    const {
      searchResponse,
      filters: { codes, contentTypeCode },
    } = item;
    let response = searchResponse;
    const isCommercePage = contentTypeCode === 'commerce_pages';
    const code = isCommercePage ? normalizedUrl : codes?.[0];
    const hash = generateContentHash({
      codes: code,
      contentTypeCode: contentTypeCode,
    });

    if (isCommercePage) {
      response = applyCommercePagesRankingStrategy(searchResponse, strategy);
    }

    const { entities, result } = {
      ...normalize({ hash, ...response }, contentEntries),
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
