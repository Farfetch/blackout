import { slugContent, typeContent } from 'tests/__fixtures__/contents';
import React from 'react';
import useContentPage from '../../useContentPage';

export const ContentPage = () => {
  const { contentPage, isLoading, error, resetContent, fetchContent } =
    useContentPage(slugContent, typeContent);

  const contentPageTitle = contentPage?.[0]?.components?.[0]?.fields?.title;

  if (isLoading) {
    return <span data-test="content-page-loading">Loading...</span>;
  }

  if (error) {
    return <span data-test="content-page-error">Something went wrong!</span>;
  }

  return (
    <>
      {contentPage && (
        <span data-test="content-page-data">{contentPageTitle.value}</span>
      )}
      <button data-test="content-page-reset" onClick={resetContent} />
      <button
        data-test="conetnt-page-fetchContent"
        onClick={() => fetchContent(slugContent, typeContent)}
      />
    </>
  );
};
