import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function GET() {
    try {
        console.log("GET /api/leads: Connecting to database...");
        await dbConnect();
        console.log("GET /api/leads: Fetching leads...");
        const leads = await Lead.find({}).sort({ createdAt: -1 });
        console.log(`GET /api/leads: Found ${leads.length} leads.`);
        return NextResponse.json(leads);
    } catch (error: any) {
        console.error("GET /api/leads Error:", error);
        return NextResponse.json({ error: "Failed to fetch leads", details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log("POST /api/leads: Connecting to database...");
        await dbConnect();
        const body = await request.json();
        console.log("POST /api/leads: Creating new lead...");
        const newLead = await Lead.create({
            ...body,
            status: body.status || "New"
        });
        console.log("POST /api/leads: Lead created successfully.");
        return NextResponse.json(newLead);
    } catch (error: any) {
        console.error("POST /api/leads Error:", error);
        return NextResponse.json({ error: "Failed to create lead", details: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        console.log("PUT /api/leads: Connecting to database...");
        await dbConnect();
        const { id, ...updateData } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        console.log(`PUT /api/leads: Updating lead ${id}...`);
        const updatedLead = await Lead.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedLead) {
            return NextResponse.json({ error: "Lead not found" }, { status: 404 });
        }

        console.log("PUT /api/leads: Lead updated successfully.");
        return NextResponse.json(updatedLead);
    } catch (error: any) {
        console.error("PUT /api/leads Error:", error);
        return NextResponse.json({ error: "Failed to update lead", details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        console.log("DELETE /api/leads: Connecting to database...");
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        console.log(`DELETE /api/leads: Deleting lead ${id}...`);
        await Lead.findByIdAndDelete(id);
        console.log("DELETE /api/leads: Lead deleted successfully.");
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE /api/leads Error:", error);
        return NextResponse.json({ error: "Failed to delete lead", details: error.message }, { status: 500 });
    }
}
