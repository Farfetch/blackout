import { expect, test } from '../../app/custom-playwright-fixtures';
import { FULL_OBJECT_VALUE_TEST_ID } from '../../app/ObjectRenderer';

test('test registered @critical', async ({ fixtureLoader }) => {
  await fixtureLoader.renderFixtureWithUserContext(
    'bag/UseBagMembers',
    'registered',
  );

  await expect(fixtureLoader.userState?.isGuest).toBe(false);

  const dataNodeValue = await fixtureLoader.page
    .getByTestId('data')
    .textContent();

  await expect(dataNodeValue).not.toBe('undefined');

  const fullObjectNodeValue = await fixtureLoader.page
    .getByTestId(FULL_OBJECT_VALUE_TEST_ID)
    .textContent();

  const valueAsJson = JSON.parse(fullObjectNodeValue);

  delete valueAsJson.data.promotionEvaluationId;
  delete valueAsJson.data.bagSummary.dateUpdated;
  delete valueAsJson.data.hadUnavailableItems;

  await expect(JSON.stringify(valueAsJson, null, 2)).toMatchSnapshot();
});

test('test guest', async ({ fixtureLoader }) => {
  await fixtureLoader.renderFixtureWithUserContext(
    'bag/UseBagMembers',
    'guest',
  );

  await expect(fixtureLoader.userState?.isGuest).toBe(true);

  const dataNodeValue = await fixtureLoader.page
    .getByTestId('data')
    .textContent();

  await expect(dataNodeValue).not.toBe('undefined');

  const fullObjectNodeValue = await fixtureLoader.page
    .getByTestId(FULL_OBJECT_VALUE_TEST_ID)
    .textContent();

  const json = JSON.parse(fullObjectNodeValue);

  delete json.data.id;
  delete json.data.bagSummary.dateUpdated;
  delete json.data.bagSummary.dateCreated;
  delete json.data.hadUnavailableItems;

  await expect(JSON.stringify(json, null, 2)).toMatchSnapshot();
});
