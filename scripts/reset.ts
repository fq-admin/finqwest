import 'dotenv/config';
// import {drizzle} from 'drizzle-orm/neon-http';
// import {neon} from '@neondatabase/serverless'

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

// const sql=neon(process.env.DATABASE_URL!);

// const db=drizzle(sql,{schema})

const main=async()=>{
    try{
        console.log('Resetting database...')

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)  
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)
        await db.delete(schema.userSubscription)

        console.log('Resetting finished')
    }catch(error){
        console.error(error)
        throw new Error('Failed to reset database')
    }
}

main()