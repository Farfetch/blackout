/**
 * @remarks
 * Hook to provide all kinds of data for the business logic attached to the
 * search suggestions functionality.
 *
 */
import {
  areSearchSuggestionsLoading,
  fetchSearchSuggestions as fetchSearchSuggestionsAction,
  getSearchSuggestionsError,
  getSearchSuggestionsResult,
  resetSearchSuggestions as resetSearchSuggestionsAction,
} from '@farfetch/blackout-redux/search';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseSearchSuggestions } from './types';

/**
 * @returns All the selectors and actions needed to manage search suggestions
 */
const useSearchSuggestions: UseSearchSuggestions = () => {
  const error = useSelector(getSearchSuggestionsError);
  const isLoading = useSelector(areSearchSuggestionsLoading);
  const suggestions = useSelector(getSearchSuggestionsResult);
  // Actions
  const fetchSearchSuggestions = useAction(fetchSearchSuggestionsAction);
  const resetSearchSuggestions = useAction(resetSearchSuggestionsAction);

  return {
    /**
     * Search suggestions error.
     */
    error,
    /**
     * Gets the search suggestions.
     */
    fetchSearchSuggestions,
    /**
     * Whether the search suggestions request is loading.
     */
    isLoading,
    /**
     * Resets the search suggestions result.
     */
    resetSearchSuggestions,
    /**
     * Search suggestions result received.
     */
    suggestions,
  };
};

export default useSearchSuggestions;
