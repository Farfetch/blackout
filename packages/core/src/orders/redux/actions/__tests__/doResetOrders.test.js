import { mockStore } from '../../../../../tests';
import doResetOrders from '../doResetOrders';
import reducer, { actionTypes } from '../../';
import thunk from 'redux-thunk';

const mockMiddlewares = [
  thunk.withExtraArgument({
    getOptions: () => ({ productImgQueryParam: '?c=2' }),
  }),
];
const ordersMockStore = (state = {}) =>
  mockStore({ orders: reducer() }, state, mockMiddlewares);

let store;

describe('doResetOrders() action creator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = ordersMockStore();
  });

  it('should create the correct actions for when the get order return options procedure is successful', async () => {
    await store.dispatch(doResetOrders());

    const actionResults = store.getActions();

    expect(actionResults).toMatchObject([
      {
        type: actionTypes.RESET_ORDERS,
      },
    ]);
  });
});
