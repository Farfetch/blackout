import React from 'react';
import useSEO from '../../useSEO';

export const SEO = query => {
  const { error, isLoading, seo, fetchSEO } = useSEO(query, '/about');

  if (isLoading) {
    return <span data-test="seo-loading"></span>;
  }

  if (error) {
    return <span data-test="seo-error">{error}</span>;
  }

  return (
    <>
      {seo && <span data-test="seo-title">{seo.title}</span>}
      <button data-test="trigger-action" onClick={() => fetchSEO(query)}>
        Trigger action
      </button>
    </>
  );
};
