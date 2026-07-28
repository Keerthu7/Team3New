import React from "react";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";
import AdminBlogsClient from "@/components/AdminBlogsClient";

async function getBlogs() {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({}).sort({ order: 1, createdAt: -1 });
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        console.error("Failed to fetch blogs for admin:", error);
        return [];
    }
}

export default async function AdminBlogsPage() {
    const blogs = await getBlogs();

    return (
        <AdminBlogsClient initialBlogs={blogs} />
    );
}
