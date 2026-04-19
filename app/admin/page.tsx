import React from "react";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Lead from "@/models/Lead";
import AdminDashboardClient from "@/components/AdminDashboardClient";

async function getAdminStats() {
    try {
        await connectToDatabase();
        
        // Fetch all counts in parallel for speed
        const [projectCount, blogCount, leadCount, recentLeads] = await Promise.all([
            Project.countDocuments(),
            Blog.countDocuments(),
            Lead.countDocuments(),
            Lead.find({}).sort({ createdAt: -1 }).limit(5)
        ]);

        return {
            stats: {
                projects: projectCount,
                blogs: blogCount,
                leads: leadCount
            },
            recentLeads: JSON.parse(JSON.stringify(recentLeads))
        };
    } catch (error) {
        console.error("Dashboard data fetch failed:", error);
        return {
            stats: { projects: 0, blogs: 0, leads: 0 },
            recentLeads: []
        };
    }
}

export default async function AdminDashboard() {
    const data = await getAdminStats();

    return (
        <AdminDashboardClient 
            stats={data.stats} 
            recentLeads={data.recentLeads} 
        />
    );
}
