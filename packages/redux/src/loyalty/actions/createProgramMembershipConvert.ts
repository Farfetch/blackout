import { createProgramMembershipConvertFactory } from './factories';
import { postProgramMembershipConvert } from '@farfetch/blackout-client';

/**
 * Create program membership convert.
 */
export default createProgramMembershipConvertFactory(
  postProgramMembershipConvert,
);
