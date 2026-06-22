import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get("admin_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const limitStr = searchParams.get("limit");
        const user = searchParams.get("user");
        const action = searchParams.get("action");
        const query = searchParams.get("query");

        const filter: any = {};

        if (user) {
            // Case-insensitive exact match
            filter.user = { $regex: `^${user.trim()}$`, $options: "i" };
        }

        if (action) {
            filter.action = action.trim();
        }

        if (query) {
            filter.$or = [
                { details: { $regex: query.trim(), $options: "i" } },
                { user: { $regex: query.trim(), $options: "i" } }
            ];
        }

        let dbQuery = ActivityLog.find(filter).sort({ timestamp: -1 });

        if (limitStr) {
            const limit = parseInt(limitStr, 10);
            if (!isNaN(limit)) {
                dbQuery = dbQuery.limit(limit);
            }
        }

        const logs = await dbQuery;
        return NextResponse.json(logs);
    } catch (error: any) {
        console.error("GET /api/activities Error:", error);
        return NextResponse.json({ error: "Failed to fetch activities", details: error.message }, { status: 500 });
    }
}
