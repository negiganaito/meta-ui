export function uuidv4() {
  let a;
  // eslint-disable-next-line no-restricted-globals
  a = !(a = self) ? void 0 : !(a = a.crypto) ? void 0 : a.randomUUID;
  return typeof a === 'function'
    ? // eslint-disable-next-line no-restricted-globals
      self.crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (a) => {
        let b = (Math.random() * 16) | 0;
        a = a === 'x' ? b : (b & 3) | 8;
        return a.toString(16);
      });
}
