import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

    let processedBuffer: any = buffer;
    let finalFilename = nameToUse;

    // Check if the uploaded file is an image
    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|tiff)$/i.test(nameToUse);
    if (isImage) {
      try {
        console.log('Optimizing image with sharp:', nameToUse);
        const image = sharp(buffer);
        const metadata = await image.metadata();
        
        let sharpInstance = image;
        
        // Resize only if width or height exceeds 3840px (4K resolution)
        if (metadata.width && metadata.height && (metadata.width > 3840 || metadata.height > 3840)) {
          sharpInstance = sharpInstance.resize({
            width: metadata.width > metadata.height ? 3840 : undefined,
            height: metadata.height >= metadata.width ? 3840 : undefined,
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        // Convert to WebP format at 95% quality for crystal clear rendering
        processedBuffer = await sharpInstance
          .webp({ quality: 95, effort: 4 })
          .toBuffer();
          
        // Change the filename extension to .webp
        const baseName = nameToUse.split('.').slice(0, -1).join('.') || 'image';
        finalFilename = `${baseName}.webp`;
      } catch (err) {
        console.error('Sharp optimization failed, using original buffer:', err);
      }
    }

    // 1. If running on Vercel OR Vercel Blob environment variable is set, upload to Vercel Blob
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL === '1') {
      console.log('Vercel environment or Blob token detected. Uploading to Vercel Blob:', finalFilename);
      const blob = await put(finalFilename, processedBuffer, {
        access: 'public',
        ...(process.env.BLOB_READ_WRITE_TOKEN ? { token: process.env.BLOB_READ_WRITE_TOKEN } : {}),
      });
      return NextResponse.json({ url: blob.url });
    }

    // 2. Local fallback if Vercel Blob token is not configured (e.g. local development)
    console.log('No Vercel Blob token detected. Saving file to local public/uploads:', finalFilename);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, finalFilename);
    fs.writeFileSync(filePath, processedBuffer);

    // Return the local relative URL
    const localUrl = `/uploads/${finalFilename}`;
    return NextResponse.json({ url: localUrl });
  } catch (error: any) {
    console.error('Upload API route error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

