export const mockUsersResponse = {
  bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
  dateOfBirth: null,
  email: 'teste@conta.com',
  gender: 0,
  id: 29538482,
  title: {
    id: '111',
    value: 'Dr.',
  },
  name: 'Ivo Mota',
  phoneNumber: null,
  segments: [],
  username: 'teste@conta.com',
  wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
  isExternalLogin: false,
  genders: ['NotDefined', 'Male', 'Female'],
  genderId: 0,
};

export const expectedNormalizedPayload = {
  entities: {
    user: {
      bagId: '3a52edfe-5b17-46b9-ba5d-ed87cb36aa67',
      dateOfBirth: null,
      email: 'teste@conta.com',
      gender: 0,
      genderId: 0,
      genders: ['NotDefined', 'Male', 'Female'],
      id: 29538482,
      isExternalLogin: false,
      name: 'Ivo Mota',
      phoneNumber: null,
      segments: [],
      username: 'teste@conta.com',
      wishlistId: '8e091868-b74b-47e1-ab27-a2c247c92242',
      title: {
        id: '111',
        value: 'Dr.',
      },
    },
  },
  result: 29538482,
};
