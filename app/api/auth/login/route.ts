import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const USERS = [
    {
        username: process.env.ADMIN_USERNAME || "team3associates",
        password: process.env.ADMIN_PASSWORD || "team3",
    },
    {
        username: process.env.USER_PRAVEEN_USERNAME || "praveen@t3",
        password: process.env.USER_PRAVEEN_PASSWORD || "Arch.praveen0003",
    },
    {
        username: process.env.USER_PRABHAKAR_USERNAME || "prabhakar@t3",
        password: process.env.USER_PRABHAKAR_PASSWORD || "Arch.prabhakar0003",
    }
];

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required" },
                { status: 400 }
            );
        }

        const isValid = USERS.some(
            (user) => 
                user.username.toLowerCase() === username.trim().toLowerCase() && 
                user.password === password
        );

        if (isValid) {
            // Set a secure HttpOnly cookie
            const userIdentifier = username.trim().toLowerCase();
            const cookieStore = await cookies();
            cookieStore.set("admin_session", userIdentifier, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day
            });

            // Log login action in audit history
            const { logActivity } = await import("@/lib/audit");
            await logActivity("LOGIN", "Admin logged in successfully", userIdentifier);

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
