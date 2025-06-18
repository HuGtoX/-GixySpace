// main.ts
import { serve } from './deps.ts';
import { handlerMaker } from './src/req-handler.ts';
import { register } from 'http://localhost:8080/register@0.1.0/mod.ts';

const filePath = new URL(import.meta.url).pathname;
const port = await register(['/v1/mail/send'], filePath);
console.log(port);
serve(handlerMaker('POST', '/v1/mail/send'), { port });
console.log(`http://localhost:${port}/v1/mail/send`);
console.log(`http://localhost:8080/api/v1/mail/send`);
