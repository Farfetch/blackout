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

  const contents = searchContentRequests.reduce((acc, item) => {
    const {
      filters: { codes, contentTypeCode },
      searchResponse,
    } = item;
    const slugWithoutJson = stripSlugSubfolderJsonTrue(slug, subfolder);
    const slugNormalized = slugWithoutJson.split('?')[0];
    const code = contentTypeCode === 'commerce_pages' ? slugNormalized : codes;
    const hash = buildContentGroupHash({ codes: code, contentTypeCode });
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

  const metadataSlug = stripSlugSubfolderJsonTrue(slug, subfolder);
  const metadataHash = buildSEOPathname({
    path: metadataSlug,
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
