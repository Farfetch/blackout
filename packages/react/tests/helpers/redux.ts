import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const store = configureStore([thunk]);

export const mockStore = state => store(state);
