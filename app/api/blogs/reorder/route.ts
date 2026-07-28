import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function PATCH(request: Request) {
    try {
        await dbConnect();
        
        const updates = await request.json();
        
        if (!Array.isArray(updates)) {
            return NextResponse.json(
                { success: false, error: 'Invalid data format. Expected an array.' },
                { status: 400 }
            );
        }

        // Run bulk update in parallel
        await Promise.all(
            updates.map(update => 
                Blog.findByIdAndUpdate(update._id, { order: update.order })
            )
        );

        return NextResponse.json({ success: true, message: 'Order updated successfully' });
    } catch (error: any) {
        console.error('Failed to update blog order:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
