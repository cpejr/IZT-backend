import { createProxyMiddleware } from 'http-proxy-middleware';
import { mailDevUrl } from '../config/mailDev';

const mailDevProxy = createProxyMiddleware('/maildev', {
  target: mailDevUrl,
  ws: true,
  logLevel: 'silent',
});

export default mailDevProxy;
