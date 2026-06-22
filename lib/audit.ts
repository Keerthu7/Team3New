import connectToDatabase from "@/lib/db";
import ActivityLog from "@/models/ActivityLog";
import { cookies } from "next/headers";

export async function logActivity(action: string, details: string, userOverride?: string) {
    try {
        await connectToDatabase();
        
        let user = userOverride;
        if (!user) {
            try {
                const cookieStore = await cookies();
                user = cookieStore.get("admin_session")?.value || "Unknown Admin";
            } catch (cookieErr) {
                // If cookies() cannot be accessed (e.g. static rendering contexts or background build tasks)
                user = "System";
            }
        }
        
        await ActivityLog.create({
            user,
            action,
            details,
            timestamp: new Date()
        });
        console.log(`[Audit Log] ${user} - ${action}: ${details}`);
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}
