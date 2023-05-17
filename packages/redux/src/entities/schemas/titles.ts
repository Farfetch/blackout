import { schema } from 'normalizr';

const titles = new schema.Entity('titles');

export default new schema.Object({ entries: [titles] });
