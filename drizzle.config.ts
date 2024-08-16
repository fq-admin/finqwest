import "dotenv/config";
import type {Config} from "drizzle-kit"

export default {
    schema: "./db/schema.ts",
    out:"./drizzle",
    dialect:"postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
} satisfies Config;


// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Client } from 'pg';

// const client = new Client({
//   host: 'localhost',
//   port: 5432, // default PostgreSQL port
//   user: 'postgres',
//   password: '1234',
//   database: 'fq',
// });

// client.connect();

// const db = drizzle(client);

// export default db;
