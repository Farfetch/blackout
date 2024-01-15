export const userTokenId = '1234';
export const externalLoginId = 'a3cb94a2-28ec-42a7-bbe8-fad1d71cce3c';

export const mockPasswordChangeData = {
  oldPassword: 'thisisOLDpassword',
  newPassword: 'thisisNEWpassword',
  userId: 0,
  username: 'pepe',
};

export const mockCreateClientCredentialsTokenResponse = {
  accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
  expiresIn: '1200',
  refreshToken:
    'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
};

export const mockCreateUserTokenData = {
  username: 'user1',
  password: 'pass123',
  grantType: 'type12',
  refreshToken:
    'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
};

export const mockErrorObject = new Error('post token error');

export const mockUserTokenResponse = {
  accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
  expiresIn: '1200',
  refreshToken:
    'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
};

export const mockLoginData = {
  username: 'pepe@acme.com',
  password: '123465',
  rememberMe: true,
};

export const mockSocialLoginData = {
  provider: 'Google',
  socialAccessToken: 'xxx-xxx-xxx-xxx',
  rememberMe: true,
  countryCode: 'PT',
};

export const mockPasswordRecoverData = {
  username: 'pepe@acme.com',
  uri: 'uri-mock',
};

export const mockRegisterData = {
  countryCode: 'PT',
  email: 'pepe@acme.com',
  name: 'Pepe',
  password: 'pepe123',
  receiveNewsLetters: true,
  username: 'pepe@acme.com',
};

export const mockPasswordResetData = {
  username: 'pepe@acme.com',
  token: '1293819283sdfs23',
  password: 'thisIsUserPassword',
};

export const mockFetchUserExternalLoginsResponse = [
  {
    id: externalLoginId,
    provider: 'google',
    providerUserId: '112797446162677409484',
  },
];

export const expectedUserExternalLoginsPayload = [
  {
    id: externalLoginId,
    provider: 'google',
    providerUserId: '112797446162677409484',
  },
];
