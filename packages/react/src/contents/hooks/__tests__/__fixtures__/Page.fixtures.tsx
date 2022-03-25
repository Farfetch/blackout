import React from 'react';
import usePage from '../../usePage';

const slug = 'cttpage';

export const Page = () => {
  const { page, isLoading, error, resetContent, fetchContent } = usePage(slug);
  const pageContent = page?.[0]?.components?.find(
    component => component.name === 'QA HTML Template',
  );

  if (isLoading) {
    return <span data-test="page-loading">Loading...</span>;
  }

  if (error) {
    return <span data-test="page-error">Something went wrong!</span>;
  }

  return (
    <>
      {page && <span data-test="page-data">{pageContent.content}</span>}
      <button data-test="page-reset" onClick={resetContent} />
      <button
        data-test="page-fetchContent"
        onClick={() => fetchContent()}
      />
    </>
  );
};
