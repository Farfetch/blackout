import EventTypes from '../EventTypes';
import PageTypes from '../PageTypes';

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
