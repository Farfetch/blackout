import eventTypes from '../eventTypes';

it('Should export eventTypes', () => {
  expect(eventTypes).toMatchSnapshot();
});
