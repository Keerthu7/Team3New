import React from "react";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Lead from "@/models/Lead";
import ActivityLog from "@/models/ActivityLog";
import AdminDashboardClient from "@/components/AdminDashboardClient";

async function getAdminData() {
    try {
        await connectToDatabase();
        
        // Fetch all counts and data in parallel for speed
        const [projectCount, blogCount, leadCount, recentLeads, recentActivities] = await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Lead.countDocuments(),
            Lead.find({}).sort({ createdAt: -1 }).limit(5),
            ActivityLog.find({}).sort({ timestamp: -1 }).limit(5)
        ]);

        return {
            stats: {
                projects: projectCount,
                blogs: blogCount,
                leads: leadCount
            },
            recentLeads: JSON.parse(JSON.stringify(recentLeads)),
            recentActivities: JSON.parse(JSON.stringify(recentActivities))
        };
    } catch (error) {
        console.error("Dashboard data fetch failed:", error);
        return {
            stats: { projects: 0, blogs: 0, leads: 0 },
            recentLeads: [],
            recentActivities: []
        };
    }
}

export default async function AdminDashboard() {
    const data = await getAdminData();

    return (
        <AdminDashboardClient 
            stats={data.stats} 
            recentLeads={data.recentLeads} 
            recentActivities={data.recentActivities}
        />
    );
}
