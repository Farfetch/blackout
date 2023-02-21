import { getStaffMember } from '../';
import {
  mockStaffMember,
  mockStaffMemberId,
} from 'tests/__fixtures__/staffMembers';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getStaffMember.fixtures';
import join from 'proper-url-join';
import mswServer from '../../../tests/mswServer';

describe('getStaffMember', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockStaffMember));

    await expect(getStaffMember(mockStaffMemberId)).resolves.toEqual(
      mockStaffMember,
    );

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/staffMembers', mockStaffMemberId),
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getStaffMember(mockStaffMemberId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/staffMembers', mockStaffMemberId),
      expectedConfig,
    );
  });
});
