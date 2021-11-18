import configureStore from 'redux-mock-store';

const store = configureStore([]);

export const mockStore = state => store(state);
