import { fileURLToPath } from 'url';
import { dirname } from 'node:path';

export default function fileDirName(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);

  return { __dirname, __filename };
}
