import {
  mockCategories,
  mockTopCategories,
} from 'tests/__fixtures__/categories';
import React, { Fragment } from 'react';
import useCategories from '../../useCategories';

const booleanToText = boolean => (boolean ? 'yes' : 'no');

export const Categories = () => {
  const {
    areCategoriesFetched,
    areTopCategoriesFetched,
    areCategoriesLoading,
    areTopCategoriesLoading,
    categories,
    categoriesError,
    fetchCategories,
    fetchTopCategories,
    resetCategoriesState,
    getCategory,
    getRootCategory,
    topCategories,
    topCategoriesError,
  } = useCategories();

  if (areCategoriesLoading) {
    return (
      <span data-test="categories-loading">
        {booleanToText(areCategoriesLoading)}
      </span>
    );
  }

  if (areTopCategoriesLoading) {
    return (
      <span data-test="topCategories-loading">
        {booleanToText(areTopCategoriesLoading)}
      </span>
    );
  }

  if (categoriesError) {
    return <span data-test="categories-error">{categoriesError.message}</span>;
  }

  if (topCategoriesError) {
    return (
      <span data-test="topCategories-error">{topCategoriesError.message}</span>
    );
  }

  return (
    <Fragment>
      {categories && (
        <span data-test="categories-result">{JSON.stringify(categories)}</span>
      )}
      {topCategories && (
        <span data-test="categories-topResult">
          {JSON.stringify(topCategories)}
        </span>
      )}
      <button data-test="categories-getButton" onClick={fetchCategories}>
        get categories request
      </button>
      <button data-test="categories-getTopButton" onClick={fetchTopCategories}>
        get top categories request
      </button>
      <button data-test="categories-resetButton" onClick={resetCategoriesState}>
        reset categories state
      </button>
      <span data-test="categories-getCategory">
        {JSON.stringify(getCategory(mockTopCategories[0].id))}
      </span>
      <span data-test="categories-getRootCategory">
        {JSON.stringify(getRootCategory(mockCategories[3].id))}
      </span>
      <span data-test="categories-fetched">
        {booleanToText(areCategoriesFetched)}
      </span>
      <span data-test="topCategories-fetched">
        {booleanToText(areTopCategoriesFetched)}
      </span>
    </Fragment>
  );
};
