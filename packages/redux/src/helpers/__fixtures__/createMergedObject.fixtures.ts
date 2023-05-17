export const target = {
  preferences: {
    testCode: '123',
  },
  products: {
    123456: {
      name: 'prod1',
      dummyObjectProp: {
        A: { dummy: 'test' },
        B: { dummy: 'another' },
      },
    },
    789123: {
      name: 'prod2',
    },
  },
};

export const source = {
  products: {
    123456: {
      name: 'newProdName',
      dummyObjectProp: {
        A: { dummy: 'update on dummy' },
      },
    },
    789123: undefined,
  },
  orders: {
    order1: {
      data: 'xpto',
    },
  },
};

export const expectedResult = {
  preferences: {
    testCode: '123',
  },
  products: {
    123456: {
      name: 'newProdName',
      dummyObjectProp: {
        A: { dummy: 'update on dummy' },
        B: { dummy: 'another' },
      },
    },
    789123: {
      name: 'prod2',
    },
  },
  orders: {
    order1: {
      data: 'xpto',
    },
  },
};
