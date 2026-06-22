import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { logActivity } from "@/lib/audit";

export async function POST() {
    const cookieStore = await cookies();
    const username = cookieStore.get("admin_session")?.value;
    if (username) {
        await logActivity("LOGOUT", "Admin signed out", username);
    }
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
}
