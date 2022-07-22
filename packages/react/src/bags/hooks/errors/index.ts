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
