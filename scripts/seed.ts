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
        console.log('Seeding database...')

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)  
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challengeProgress)
        await db.delete(schema.userSubscription)

        await db.insert(schema.courses).values([
            {
                id:1,
                title:'Investing',
                imageSrc:'in.svg',
            },
            {
                id:2,
                title:'Savings',
                imageSrc:'sa.svg',
            },
            {
                id:3,
                title:'Taxation',
                imageSrc:'ta.svg',
            },
        ]);

        await db.insert(schema.units).values([
            {
                id:1,
                courseId:1,
                title:'Unit-1',
                description:'Economic and Financial Profile of India',
                order:1,
            },
        ]);

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,
                title:'Unit-1',
                order:1,
            },
            {
                id:2,
                unitId:1,
                title:'Why invest?',
                order:2,
            },
            {
                id:3,
                unitId:1,
                title:'Types of investments',
                order:3,
            },
            {
                id:4,
                unitId:1,
                title:'Why invest?',
                order:4,
            },
            {
                id:5,
                unitId:1,
                title:'Types of investments',
                order:5,
            },
        ]);
            
        await db.insert(schema.challenges).values([
                {
                id:1,
                lessonId:1,
                type:'SELECT',
                question:'Which sector contributes the most to India\'s GDP?',
                order:1,
            },
            {
                id:2,
                lessonId:1,
                type:'SELECT',
                question:'What was India\'s Real GDP Growth Rate in April 2024 according to the IMF?',
                order:2,
            },
            {
                id:3,
                lessonId:1,
                type:'SELECT',
                question:'What is a significant challenge for the agricultural sector in India?',
                order:3,
            },
            {
                id:4,
                lessonId:1,
                type:'SELECT',
                question:'Why is there a discrepancy in unemployment rates between the World Bank and GOI?',
                order:1,
            },
        ]);
        
        await db.insert(schema.challenges).values([
            {
                id:5,
                lessonId:2,
                type:'SELECT',
                question:'Which sector contributes the most to India\'s GDP?',
                order:1,
            },
            {
                id:6,
                lessonId:2,
                type:'SELECT',
                question:'What was India\'s Real GDP Growth Rate in April 2024 according to the IMF?',
                order:2,
            },
            {
                id:7,
                lessonId:2,
                type:'SELECT',
                question:'What is a significant challenge for the agricultural sector in India?',
                order:3,
            },
            {
                id:8,
                lessonId:2,
                type:'SELECT',
                question:'Why is there a discrepancy in unemployment rates between the World Bank and GOI?',
                order:1,
            },
            ]);

        await db.insert(schema.challengeOptions).values([
            {
                id:1,
                challengeId:1,
                text:'Agriculture',
                correct:true,
            },
            {
                id:2,
                challengeId:1,
                text:'Manufacturing',
                correct:false,
            },
            {
                id:3,
                challengeId:1,
                text:'Services',
                correct:false,
            },
            {
                id:4,
                challengeId:1,
                text:'Industry',
                correct:true,
            },
            {
                id:5,
                challengeId:2,
                text:'5.5%',
                correct:true,
            },
            {
                id:6,
                challengeId:2,
                text:'6.8%',
                correct:false,
            },
            {
                id:7,
                challengeId:2,
                text:'7.24%',
                correct:true,
            },
            {
                id:8,
                challengeId:2,
                text:'8.0%',
                correct:false,
            },
            {
                id:9,
                challengeId:3,
                text:'Overproduction',
                correct:false,
            },
            {
                id:10,
                challengeId:3,
                text:'Modernization and efficiency',
                correct:true,
            },
            {
                id:11,
                challengeId:3,
                text:'High export tariffs',
                correct:false,
            },
            {
                id:12,
                challengeId:3,
                text:'Lack of workforce',
                correct:false,
            },
            {
                id:13,
                challengeId:4,
                text:'Differnt survey methods',
                correct:false,
            },
            {
                id:14,
                challengeId:4,
                text:'Differnt definitions and informal sector tracking',
                correct:true,
            },
            {
                id:15,
                challengeId:4,
                text:'Errors in data collection',
                correct:false,
            },
            {
                id:16,
                challengeId:4,
                text:'Seasonal employment variations', 
                correct:false,
            },
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                id:17,
                challengeId:5,
                text:'Agriculture',
                correct:true,
            },
            {
                id:18,
                challengeId:5,
                text:'Manufacturing',
                correct:false,
            },
            {
                id:19,
                challengeId:5,
                text:'Services',
                correct:false,
            },
            {
                id:20,
                challengeId:5,
                text:'Industry',
                correct:true,
            },
            {
                id:21,
                challengeId:6,
                text:'5.5%',
                correct:true,
            },
            {
                id:22,
                challengeId:6,
                text:'6.8%',
                correct:false,
            },
            {
                id:23,
                challengeId:6,
                text:'7.24%',
                correct:true,
            },
            {
                id:24,
                challengeId:6,
                text:'8.0%',
                correct:false,
            },
            {
                id:25,
                challengeId:7,
                text:'Overproduction',
                correct:false,
            },
            {
                id:26,
                challengeId:7,
                text:'Modernization and efficiency',
                correct:true,
            },
            {
                id:27,
                challengeId:7,
                text:'High export tariffs',
                correct:false,
            },
            {
                id:28,
                challengeId:7,
                text:'Lack of workforce',
                correct:false,
            },
            {
                id:29,
                challengeId:8,
                text:'Differnt survey methods',
                correct:false,
            },
            {
                id:30,
                challengeId:8,
                text:'Differnt definitions and informal sector tracking',
                correct:true,
            },
            {
                id:31,
                challengeId:8,
                text:'Errors in data collection',
                correct:false,
            },
            {
                id:32,
                challengeId:8,
                text:'Seasonal employment variations', 
                correct:false,
            },
        ]);

        console.log('seeding finished')
    }catch(error){
        console.error(error)
        throw new Error('Failed to seed database')
    }
}

main()