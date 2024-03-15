import { AuthStorageFiles, BaseUrls } from './constants';
import { test as base, type Browser, type Page } from '@playwright/test';
import { type User } from '@farfetch/blackout-client';
import fs from 'fs';

type UserContextType = 'guest' | 'registered';

class FixtureLoader {
  public page!: Page;
  public userState: User | undefined;

  constructor(public browser: Browser) {}

  private async renderFixtureWithUserState(
    fixturePath: string,
    userState: User,
  ) {
    const userStateNormalized = {
      entities: { user: userState },
      result: userState.id,
    };

    const userStateAsString = JSON.stringify(userStateNormalized);

    const storageState = userStateNormalized.entities.user.isGuest
      ? AuthStorageFiles.UserContextStorageState.Guest
      : AuthStorageFiles.UserContextStorageState.Registered;

    const newContext = this.browser.newContext({ storageState });

    this.page = await (await newContext).newPage();

    this.userState = userState;

    await this.page.context().addInitScript(
      `window.actionsToDispatch = [];
       window.actionsToDispatch.push({
        payload: JSON.parse('${userStateAsString}'), 
        type: "@farfetch/blackout-redux/FETCH_USER_SUCCESS",
      });`,
    );

    await this.page.goto(`${BaseUrls.LocalServer}/e2e/${fixturePath}#no-dev`);
    await this.page.waitForSelector(
      '[data-testid="testcase"]:not([aria-busy="true"])',
    );
  }

  private async loadUserState(userStateFile: string) {
    const userData = await fs.readFileSync(userStateFile, 'utf8');

    return JSON.parse(userData);
  }

  async renderFixtureWithUserContext(
    fixturePath: string,
    userContextType: UserContextType = 'guest',
  ) {
    const userState = await this.loadUserState(
      userContextType === 'guest'
        ? AuthStorageFiles.UserState.Guest
        : AuthStorageFiles.UserState.Registered,
    );

    return await this.renderFixtureWithUserState(fixturePath, userState);
  }
}

type CustomFixtures = {
  fixtureLoader: FixtureLoader;
};

export const test = base.extend<CustomFixtures>({
  fixtureLoader: async ({ browser }, use) => {
    await use(new FixtureLoader(browser));
  },
});

export { expect } from '@playwright/test';
