import EventTypes from '../EventTypes.js';
import PageTypes from '../PageTypes.js';

it('Should validate if event and page do not have same values', () => {
  const eventValues = Object.values(EventTypes);
  const pageValues = Object.values(PageTypes);

  expect(
    // @ts-expect-error
    eventValues.filter(event => pageValues.includes(event)),
  ).toHaveLength(0);

  expect(
    // @ts-expect-error
    pageValues.filter(event => eventValues.includes(event)),
  ).toHaveLength(0);
});
