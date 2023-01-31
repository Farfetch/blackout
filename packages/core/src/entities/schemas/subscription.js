import { schema } from 'normalizr';

const packagesSchema = new schema.Entity('subscriptionPackages');

const responseSchema = {
  packages: [packagesSchema],
};

export default responseSchema;
