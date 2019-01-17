import { Pool } from 'pg';
import config from './config';

let connect;

if (process.env.NODE_ENV === 'test') {
  connect = config.test;
} else if (process.env.NODE_ENV === 'development') {
  connect = config.development;
} else if (process.env.NODE_ENV === 'production') {
  connect = config.production;
}

const pool = new Pool(connect);

export default pool;
