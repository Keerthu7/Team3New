import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const USERS_INFO: Record<string, { name: string; role: string; initials: string }> = {
    "team3associates": { name: "Team 3 Admin", role: "Super Admin", initials: "TA" },
    "praveen@t3": { name: "Praveen Kumar", role: "Engineer", initials: "PK" },
    "prabhakar@t3": { name: "Prabhakar", role: "Architect", initials: "PA" }
};

export async function GET() {
    try {
        const cookieStore = await cookies();
        const username = cookieStore.get("admin_session")?.value;

        if (!username) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const info = USERS_INFO[username.toLowerCase()] || {
            name: username,
            role: "Administrator",
            initials: username.slice(0, 2).toUpperCase()
        };

        return NextResponse.json({ username, ...info });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
