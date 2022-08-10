export default function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}
