// Type to prevent error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Type'.
// Typically objects need an index signature with the list of all types inside that object.
// https://stackoverflow.com/questions/32968332/how-do-i-prevent-the-error-index-signature-of-object-type-implicitly-has-an-an
export type IndexSignature<T> = {
  [k: string]: T;
};
