import React from "react";
import connectToDatabase from "@/lib/db";
import Lead from "@/models/Lead";
import AdminLeadsClient from "@/components/AdminLeadsClient";

async function getLeads() {
    try {
        await connectToDatabase();
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(leads));
    } catch (error) {
        console.error("Failed to fetch leads for admin:", error);
        return [];
    }
}

export default async function AdminLeadsPage() {
    const leads = await getLeads();

    return (
        <AdminLeadsClient initialLeads={leads} />
    );
}
