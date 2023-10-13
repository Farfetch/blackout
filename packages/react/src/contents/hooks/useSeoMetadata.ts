import { buildLinks, buildMetas } from '../utils/index.js';
import {
  fetchSEOMetadata,
  getSEOMetadataError,
  getSEOMetadataResult,
  isSEOMetadataFetched,
  isSEOMetadataLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  type GetSEOMetadataQuery,
  SeoPageType,
  SeoSubPageType,
} from '@farfetch/blackout-client';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { AppIconLinks, Link, Meta } from '../types/index.js';
import type { UseSeoMetadataOptions } from './types/useSeoMetadataOptions.types.js';

/**
 * Hook to return seo metadata to populate document head.
 *
 * @param data - object that receives SEO query, icon links, additional links, metas and options
 *
 * @returns - Returns actions and SEO metadata state for a given path.
 */
const useSeoMetadata = (
  {
    query,
    appIconLinks = {},
    links = [],
    metas = [],
  }: {
    query: GetSEOMetadataQuery;
    appIconLinks?: AppIconLinks;
    links?: Link[];
    metas?: Meta[];
  },
  options: UseSeoMetadataOptions = {},
) => {
  const store = useStore();

  const { enableAutoFetch = true } = options;
  const error = useSelector((state: StoreState) =>
    getSEOMetadataError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    isSEOMetadataLoading(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    isSEOMetadataFetched(state, query),
  );
  const seo = useSelector((state: StoreState) =>
    getSEOMetadataResult(state, query),
  );
  const { path = '' } = query;
  const fetch = useAction(fetchSEOMetadata);

  const data = useMemo(
    () =>
      seo
        ? {
            title: seo.title,
            description: seo.description,
            canonical: seo.canonicalUrl,
            meta: buildMetas(seo, metas),
            link: buildLinks(seo, appIconLinks, links),
            seo,
          }
        : undefined,
    [seo, metas, appIconLinks, links],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = isSEOMetadataLoading(updatedState, query);
    const updatedIsFetched = isSEOMetadataFetched(updatedState, query);

    if (enableAutoFetch && !updatedIsLoading && !updatedIsFetched) {
      fetch({
        ...query,
        pageType: query.pageType || SeoPageType.Pages,
        subPageType: query.subPageType || SeoSubPageType.Default,
        path,
      });
    }
  }, [fetch, path, query, enableAutoFetch, store]);

  return {
    error,
    isLoading,
    isFetched,
    data,
    actions: {
      fetch,
    },
  };
};

export default useSeoMetadata;
