import {
  buildContentGroupHash,
  buildSEOPathname,
  stripSlugSubfolderJsonTrue,
} from '../utils';
import { INITIAL_STATE } from './reducer';
import { normalize } from 'normalizr';
import contentGroup from '../../entities/schemas/contentGroup';
import get from 'lodash/get';
import merge from 'lodash/merge';
import Url from 'url-parse';

/**
 * Converts server data from searchContentRequests to store state.
 *
 * @function serverInitialState
 *
 * @param {object} page - Params from the `page` object injected by the server.
 * @param {object} page.model - Page model.
 *
 * @returns {object} Initial state for the contents reducer.
 */
export default ({ model }) => {
  if (!get(model, 'searchContentRequests') || !get(model, 'seoMetadata')) {
    return { contents: INITIAL_STATE };
  }

  const { searchContentRequests, seoMetadata, slug, subfolder } = model;
  const url = new Url(slug);
  const slugNormalized = stripSlugSubfolderJsonTrue(url.pathname, subfolder);

  const contents = searchContentRequests.reduce((acc, item) => {
    const { searchResponse } = item;

    if (searchResponse.entries.length === 0) return acc;

    const contentTypeCode = searchResponse.entries[0].contentTypeCode;
    const codes = searchResponse.entries[0].code;
    const code = contentTypeCode === 'commerce_pages' ? slugNormalized : codes;
    const hash = buildContentGroupHash({
      codes: code,
      contentTypeCode,
    });

    const { entities } = {
      ...normalize({ hash, ...searchResponse }, contentGroup),
    };

    return merge(acc, {
      entities,
      contents: {
        isLoading: {
          [hash]: false,
        },
        error: {},
      },
    });
  }, {});

  const metadataHash = buildSEOPathname({
    path: slugNormalized,
    pageType: 'pages',
  });

  const metadata = {
    contents: {
      metadata: {
        isLoading: {
          [metadataHash]: false,
        },
        error: {},
        result: {
          [metadataHash]: { ...seoMetadata },
        },
      },
    },
  };

  return merge(contents, metadata);
};
