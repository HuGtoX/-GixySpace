import { Config } from '@netlify/edge-functions';
import Get from './src/todo/get.mts';
import Add from './src/todo/add.mts';
import Update from './src/todo/update.mts';
import Archive from './src/todo/archive.mts';
import Delete from './src/todo/delete.mts';
import handlerMaker from './utils/handleMaker.mts';

// 路由映射表
const routes = {
  '/api/todo/get': Get,
  '/api/todo/add': Add,
  '/api/todo/update': Update,
  '/api/todo/archive': Archive,
  '/api/todo/delete': Delete
};

export default handlerMaker(routes);
export const config: Config = {
  path: '/api/todo/*',
  method: ['GET', 'POST', 'PATCH', 'DELETE']
};