import { createProgramMembershipConvertFactory } from './factories';
import { postProgramMembershipConvert } from '@farfetch/blackout-client/loyalty';

/**
 * Create program membership convert.
 */
export default createProgramMembershipConvertFactory(
  postProgramMembershipConvert,
);
