import { NextResponse } from "next/server";
import db from '@/db/drizzle';
import { challengeOptions } from '@/db/schema';
import { isAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';

export const GET = async (req: Request) => {
    // Check if the user is an admin
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse the URL and extract the challengeId if it exists
    const url = new URL(req.url);
    const filter = url.searchParams.get('filter');
    let challengeId: number | null = null;

    if (filter) {
        // Decode the filter parameter and parse the JSON
        const decodedFilter = decodeURIComponent(filter);
        const filterObj = JSON.parse(decodedFilter);

        // Extract challengeId from the filter object
        challengeId = filterObj.challengeId ? Number(filterObj.challengeId) : null;
    }
    console.log(challengeId)
    let data;

    // Query the database based on the challengeId
    if (challengeId) {
        data = await db.query.challengeOptions.findMany({
            where: eq(challengeOptions.challengeId, challengeId),
        });
    } else {
        data = await db.query.challengeOptions.findMany();
    }

    return NextResponse.json(data);
};

export const POST = async (req: Request) => {
    // Check if the user is an admin
    if (!isAdmin()) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Parse the request body
    const body = await req.json();

    // Insert new data into the database
    const data = await db.insert(challengeOptions).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
};
