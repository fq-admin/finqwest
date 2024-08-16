// import {neon} from "@neondatabase/serverless"
import * as schema from '@/db/schema';
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "1234",
  database: "fq",
});
client.connect();
const db = drizzle(client,{schema});

export default db