import Entity from '../Entity';

describe('Entity', () => {
  const entity = new Entity();

  it('Should store data with set()', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    entity.set(data);

    expect(entity.data).toEqual(data);
  });

  it('Should return data with get()', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    entity.set(data);

    expect(entity.get()).toEqual(data);
  });

  it('Should return data with get(key)', () => {
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    entity.set(data);

    expect(entity.get('foo')).toEqual(data.foo);
  });

  it('Should clear data with clear()', () => {
    const initialState = {};
    const data = {
      foo: 'bar',
      obj: {
        bar: 'foo',
      },
    };

    entity.set(data);

    expect(entity.data).toEqual(data);

    entity.set({}, true);

    expect(entity.data).toEqual(initialState);
  });
});
