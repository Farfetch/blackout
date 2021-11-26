import React, { Fragment } from 'react';
import useSearchIntents from '../../useSearchIntents';

const booleanToText = boolean => (boolean ? 'yes' : 'no');

export const Search = () => {
  const {
    error,
    fetchSearchIntents,
    isLoading,
    resetSearchIntents,
    searchIntents,
    searchRedirectUrl,
  } = useSearchIntents();

  if (isLoading) {
    return (
      <span data-test="searchIntents-loading">{booleanToText(isLoading)}</span>
    );
  }

  if (error) {
    return <span data-test="searchIntents-error">{error}</span>;
  }

  return (
    <Fragment>
      {searchIntents && (
        <span data-test="searchIntents-result">
          {JSON.stringify(searchIntents)}
        </span>
      )}
      <span data-test="searchIntents-redirectUrl">{searchRedirectUrl}</span>
      <button data-test="searchIntents-getButton" onClick={fetchSearchIntents}>
        get search intents request
      </button>
      <button
        data-test="searchIntents-resetButton"
        onClick={resetSearchIntents}
      >
        reset search state
      </button>
    </Fragment>
  );
};
