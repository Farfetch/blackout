import { type APIRequestContext, test as setup } from '@playwright/test';
import { AuthStorageFiles } from '../app/constants';
import fs from 'fs';

async function performGuestDataInitialization(request: APIRequestContext) {
  // Load home page to get guest cookie
  await request.get('/');

  const userDataResponse = await request.get('/api/account/v1/users/me', {
    headers: {
      accept: 'application/json, text/plain, */*',
    },
  });

  // End of authentication steps.
  await request.storageState({
    path: AuthStorageFiles.UserContextStorageState.Guest,
  });

  const userDataBody = (await userDataResponse.body()).toString('utf8');

  fs.writeFileSync(AuthStorageFiles.UserState.Guest, userDataBody, {
    encoding: 'utf-8',
  });

  console.log(
    'Guest user state data was written to file: ',
    AuthStorageFiles.UserState.Guest,
  );
}

async function performRegisteredUserDataInitialization(
  request: APIRequestContext,
) {
  // Perform login
  const loginResponse = await request.post('/api/legacy/v1/account/login', {
    data: {
      username: process.env.TEST_ACCOUNT_USERNAME,
      password: process.env.TEST_ACCOUNT_PASSWORD,
    },
  });

  // Save request context to auth file so it can be reused in subsequent tests
  await request.storageState({
    path: AuthStorageFiles.UserContextStorageState.Registered,
  });

  const loginResponseBody = (await loginResponse.body()).toString('utf8');

  // Write login response to file so it can be reused in subsequent tests
  fs.writeFileSync(AuthStorageFiles.UserState.Registered, loginResponseBody, {
    encoding: 'utf-8',
  });

  console.log(
    'Registered user state data was written to file: ',
    AuthStorageFiles.UserState.Registered,
  );
}

setup('perform authentication', async ({ request }) => {
  console.log('beginning authentication setup...');

  await performGuestDataInitialization(request);

  await performRegisteredUserDataInitialization(request);

  console.log('finished authentication setup successfully!');
});
