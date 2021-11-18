export const mockStaffMemberId = '01804f99-06f8-4feb-a94e-e7a22e3ad0a2';

export const mockStaffMember = {
  displayName: 'Pepe',
  email: 'pepe@acme.com',
  id: mockStaffMemberId,
  tenantId: 25000,
  userName: 'pepe',
};

export const mockState = {
  staffMembers: {
    isLoading: {
      [mockStaffMemberId]: false,
    },
    error: {
      [mockStaffMemberId]: undefined,
    },
    result: {
      [mockStaffMemberId]: mockStaffMember,
    },
  },
};
