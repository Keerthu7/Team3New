import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const filename = formData.get('filename') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const nameToUse = filename || file.name || 'image.webp';
    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. If Vercel Blob environment variable is set, upload to Vercel Blob on the server
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('Vercel Blob token detected. Uploading server-side:', nameToUse);
      const blob = await put(nameToUse, buffer, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return NextResponse.json({ url: blob.url });
    }

    // 2. Local fallback if Vercel Blob token is not configured (e.g. local development)
    console.log('No Vercel Blob token detected. Saving file to local public/uploads:', nameToUse);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, nameToUse);
    fs.writeFileSync(filePath, buffer);

    // Return the local relative URL
    const localUrl = `/uploads/${nameToUse}`;
    return NextResponse.json({ url: localUrl });
  } catch (error: any) {
    console.error('Upload API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

