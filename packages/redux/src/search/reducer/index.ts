import { combineReducers } from 'redux';
import searchDidYouMeanReducer from './searchDidYouMean.js';
import searchIntentsReducer from './searchIntents.js';
import searchSuggestionsReducer from './searchSuggestions.js';

export default combineReducers({
  didYouMean: searchDidYouMeanReducer,
  intents: searchIntentsReducer,
  suggestions: searchSuggestionsReducer,
});
