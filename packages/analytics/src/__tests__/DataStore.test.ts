import DataStore from '../DataStore';

describe('DataStore', () => {
  const dataStore = new DataStore();

  it('Should store data with set()', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    dataStore.set(data);

    expect(dataStore.data).toEqual(data);
  });

  it('Should return data with get()', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    dataStore.set(data);

    expect(dataStore.get()).toEqual(data);
  });

  it('Should return data with get(key)', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    dataStore.set(data);

    expect(dataStore.get('foo')).toEqual(data.foo);
  });

  it('Should clear data with clear()', () => {
    const initialState = {};
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    dataStore.set(data);

    expect(dataStore.data).toEqual(data);

    dataStore.set({}, true);

    expect(dataStore.data).toEqual(initialState);
  });
});
