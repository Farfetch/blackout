import { combineReducers } from 'redux';
import searchDidYouMeanReducer from './searchDidYouMean';
import searchIntentsReducer from './searchIntents';
import searchSuggestionsReducer from './searchSuggestions';

export default combineReducers({
  didYouMean: searchDidYouMeanReducer,
  intents: searchIntentsReducer,
  suggestions: searchSuggestionsReducer,
});
