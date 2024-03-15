import {
  bagsReducer,
  brandsReducer,
  categoriesReducer,
  checkoutReducer,
  contentsReducer,
  createDefaultEntitiesReducer,
  formsReducer,
  localeReducer,
  ordersReducer,
  paymentsReducer,
  productsReducer,
  returnsReducer,
  searchReducer,
  subscriptionsReducer,
  usersReducer,
  wishlistsReducer,
} from '@farfetch/blackout-redux';

const reducer = {
  entities: createDefaultEntitiesReducer([]),
  bag: bagsReducer,
  brands: brandsReducer,
  categories: categoriesReducer,
  checkout: checkoutReducer,
  contents: contentsReducer,
  products: productsReducer,
  forms: formsReducer,
  locale: localeReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  returns: returnsReducer,
  search: searchReducer,
  subscriptions: subscriptionsReducer,
  users: usersReducer,
  wishlist: wishlistsReducer,
};

export default reducer;
