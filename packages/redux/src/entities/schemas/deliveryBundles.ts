import { schema } from 'normalizr';

const deliveryBundles = new schema.Entity('deliveryBundles');

export default new schema.Array(deliveryBundles);
