/**
 * @module search/reducer
 * @category Search
 * @subcategory Reducer
 */
import { combineReducers } from 'redux';
import searchDidYouMeanReducer from './searchDidYouMean';
import searchIntentsReducer from './searchIntents';
import searchSuggestionsReducer from './searchSuggestions';

export default combineReducers({
  didYouMean: searchDidYouMeanReducer,
  intents: searchIntentsReducer,
  suggestions: searchSuggestionsReducer,
});
