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

    // 1. If running on Vercel OR Vercel Blob environment variable is set, upload to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL === '1') {
      console.log('Vercel environment or Blob token detected. Uploading to Vercel Blob:', nameToUse);
      const blob = await put(nameToUse, buffer, {
        access: 'public',
        ...(process.env.BLOB_READ_WRITE_TOKEN ? { token: process.env.BLOB_READ_WRITE_TOKEN } : {}),
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

