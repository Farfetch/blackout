import { createProgramMembershipConvertFactory } from './factories/index.js';
import { postProgramMembershipConvert } from '@farfetch/blackout-client';

/**
 * Create program membership convert.
 */
export default createProgramMembershipConvertFactory(
  postProgramMembershipConvert,
);
