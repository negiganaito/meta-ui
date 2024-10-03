export function uuidv4() {
  // eslint-disable-next-line no-restricted-globals
  const randomUUID = self?.crypto?.randomUUID;

  if (typeof randomUUID === 'function') {
    // eslint-disable-next-line no-restricted-globals
    return self.crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const randomValue = (Math.random() * 16) | 0;
    const value = char === 'x' ? randomValue : (randomValue & 0x3) | 0x8;
    return value.toString(16);
  });
}
