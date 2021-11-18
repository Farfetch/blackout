import { getState } from '..';

const mockStateId = 3;
const mockState = {
  code: 'AL',
  countryId: 216,
  id: 3,
  name: 'Alabama',
};

describe('getState()', () => {
  it('should return the state entity', () => {
    const state = {
      entities: {
        states: {
          [mockStateId]: mockState,
        },
      },
    };

    expect(getState(state, mockStateId)).toEqual(mockState);
  });
});
