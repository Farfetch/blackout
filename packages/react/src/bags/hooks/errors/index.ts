export class ProductError extends Error {
  constructor() {
    super('The product data is not fetched.');
  }
}

export class SizeError extends Error {
  constructor() {
    super('Invalid size id.');
  }
}

export class AddUpdateItemBagError extends Error {
  constructor(public code: number) {
    const message =
      code === 3
        ? 'No stock available for this item'
        : 'Missing stock information';
    super(message);
  }
}

export class BagItemNotFoundError extends Error {
  code: number;

  constructor() {
    super('Bag item not found');
    this.code = 1;
  }
}
