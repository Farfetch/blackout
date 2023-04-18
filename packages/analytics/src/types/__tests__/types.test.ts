import EventType from '../EventType.js';
import PageType from '../PageType.js';

it('Should validate if event and page do not have same values', () => {
  const eventValues = Object.values(EventType);
  const pageValues = Object.values(PageType);

  expect(
    // @ts-expect-error
    eventValues.filter(event => pageValues.includes(event)),
  ).toHaveLength(0);

  expect(
    // @ts-expect-error
    pageValues.filter(event => eventValues.includes(event)),
  ).toHaveLength(0);
});
