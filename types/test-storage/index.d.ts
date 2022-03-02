declare module 'test-storage' {
  // The implementation of this module is in __mocks__/test-storage.js file
  // This was a hack to avoid having to create a class for every test that
  // required a Storage.
  export default class TestStorage {
    items: Record<string, string>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
    setItem(key: string, value: string): Promise<void>;
    clear(): Promise<void>;
  }
}
