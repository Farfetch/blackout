import eventTypes from '../eventTypes';
import pageTypes from '../pageTypes';

it('Should validate if event and page do not have same values', () => {
  const eventValues = Object.values(eventTypes);
  const pageValues = Object.values(pageTypes);

  expect(
    eventValues.filter(event => pageValues.includes(event)).length,
  ).toEqual(0);

  expect(
    pageValues.filter(event => eventValues.includes(event)).length,
  ).toEqual(0);
});
