import { createProxyMiddleware } from 'http-proxy-middleware';
import { mailDevUrl } from '../config/mail/mailDev.js';

const mailDevProxy = createProxyMiddleware('/maildev', {
  target: mailDevUrl,
  ws: true,
  logLevel: 'silent',
});

export default mailDevProxy;
