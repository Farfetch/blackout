import { getStaffMember } from '../';
import {
  mockStaffMember,
  mockStaffMemberId,
} from 'tests/__fixtures__/staffMembers';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getStaffMember.fixtures';
import join from 'proper-url-join';
import moxios from 'moxios';

describe('getStaffMember', () => {
  const spy = jest.spyOn(client, 'get');
  const expectedConfig = undefined;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = mockStaffMember;

    fixtures.success({
      response,
      id: mockStaffMemberId,
    });

    expect.assertions(2);

    await expect(getStaffMember(mockStaffMemberId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/staffMembers', mockStaffMemberId),
      expectedConfig,
    );
  });

  it('should receive a client request error', () => {
    fixtures.failure({ id: mockStaffMemberId });

    expect.assertions(2);

    expect(getStaffMember(mockStaffMemberId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      join('/account/v1/staffMembers', mockStaffMemberId),
      expectedConfig,
    );
  });
});
