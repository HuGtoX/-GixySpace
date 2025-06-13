import { serve } from './deps.ts';
import { handlerMaker } from './req-handler.ts';
import { register } from 'http://localhost:8080/register@0.1.0/mod.ts';

const filePath = new URL(import.meta.url).pathname;
const port = await register(['/users/search'], filePath);
console.log(port);
serve(handlerMaker('POST', '/users/search'), { port });
