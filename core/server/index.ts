export * from './restful';
export * from './utility';
export * from './parser';
export * from './converter';

import data from '@/package.json';
const ServerVersion = `v${data.version}`;
const ServerName = data.description;
export { ServerName, ServerVersion };