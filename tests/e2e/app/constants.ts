export const AuthStorageFiles = {
  UserState: {
    Guest: 'playwright/.auth/guest-state.json',
    Registered: 'playwright/.auth/registered-state.json',
  },
  UserContextStorageState: {
    Guest: 'playwright/.auth/guest.json',
    Registered: 'playwright/.auth/registered.json',
  },
};

export const BaseUrls = {
  ProxyTarget: process.env.PROXY_TARGET,
  LocalServer: 'https://development.blackandwhite-ff.com:3000',
};
