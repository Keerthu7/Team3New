import React from "react";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import AdminProjectsClient from "@/components/AdminProjectsClient";

async function getProjects() {
    try {
        await connectToDatabase();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("Failed to fetch projects for admin:", error);
        return [];
    }
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <AdminProjectsClient initialProjects={projects} />
    );
}
