import crypto from 'node:crypto';

export default function randomFileName(name, bytesNumber = 16) {
  const hash = crypto.randomBytes(bytesNumber);

  return `${hash.toString('hex')}-${name}`;
}
