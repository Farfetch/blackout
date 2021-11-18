// @TODO: remove this file in the next version
import { buildBagItem, createBagItemHash } from '../bags/redux/utils';
import { compose, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import PropTypes from 'prop-types';
/**
 * WithProductActions HOC propTypes.
 */
const propTypes = {
  addBagItem: PropTypes.func,
  bagItems: PropTypes.array,
  getProductDetails: PropTypes.func,
  productId: PropTypes.number,
  updateBagItem: PropTypes.func,
};

/**
 * Object with all custom handlers to provide.
 *
 * @property {Function} onAddBagItem - Handler to process data and call add to bag item action.
 *
 * @memberof withProductActions
 */
const customHandlers = {
  // Handler that provide all tenant logic to deal with add, update or add the next merchant available function.
  onAddBagItem:
    ({ addBagItem, updateBagItem, bagItems }) =>
    async ({
      product,
      size,
      quantity = 1,
      from,
      affiliation,
      coupon,
      discount,
      index,
      listName,
      locationId,
    }) => {
      let quantityToHandle = quantity;

      // Iterate through the stock of different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // The quantity we want to add might be limited
        // by the merchant stock
        const quantityToAdd = Math.min(quantityToHandle, merchantQuantity);
        // Format the data to send to the request
        const requestData = buildBagItem({
          merchantId,
          product,
          quantity: quantityToAdd,
          size,
        });
        // Checks if the item we want to add is already in bag
        // by comparing the bag items' hash
        const hash = createBagItemHash(requestData);
        const itemInBag =
          bagItems && bagItems.find(item => createBagItemHash(item) === hash);

        // When the item is in bag, we update its quantity
        if (itemInBag) {
          const newQuantity = quantityToAdd + itemInBag.quantity;

          // Check if our quantity to update fits on the current merchant's stock
          // and if not, try adding less
          for (let i = newQuantity; i > itemInBag.quantity; i--) {
            if (i <= merchantQuantity) {
              await updateBagItem(itemInBag.id, {
                ...requestData,
                quantity: i,
                oldQuantity: itemInBag.quantity,
                oldSize: itemInBag.size,
                from,
                affiliation,
                coupon,
                discount,
                index,
                listName,
                locationId,
              });

              // Now we have less quantity to add to the next merchant
              quantityToHandle -= i - itemInBag.quantity;
              break;
            }
          }
        } else {
          // When the item is not in the bag, we add it
          await addBagItem({
            ...requestData,
            from,
            affiliation,
            coupon,
            discount,
            index,
            listName,
            locationId,
          });

          // Now we have less quantity to add to the next merchant
          quantityToHandle -= quantityToAdd;
        }

        // If there's no more quantity to add, we have finished
        if (quantityToHandle === 0) {
          return;
        }
      }
    },
  /**
   * Handler to process data and call get product details action.
   *
   * @param {object} props - Component props.
   * @param {object} props.productId - Product id to get details.
   * @param {Function} props.getProductDetails - Action received with the desired behaviour and client.
   */
  onGetProductDetails:
    ({ productId, getProductDetails }) =>
    specificId => {
      const idToRequest = specificId || productId;

      return getProductDetails(idToRequest);
    },
};

/**
 * High order component that controls the product actions.
 */
export default compose(
  setDisplayName('withProductActions'),
  setPropTypes(propTypes),
  withHandlers(customHandlers),
);
