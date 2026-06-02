const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToExtend = [
  {
    src: 'public/images/project4.png',
    width: 1920,
    height: 880,
    skyHeight: 140
  },
  {
    src: 'public/images/project2.png',
    width: 1920,
    height: 880,
    skyHeight: 140
  }
];

async function run() {
  for (const img of imagesToExtend) {
    const srcPath = path.join(process.cwd(), img.src);
    try {
      if (fs.existsSync(srcPath)) {
        console.log(`Processing ${img.src}...`);
        
        // 1. Get metadata
        const metadata = await sharp(srcPath).metadata();
        const w = metadata.width;
        const h = metadata.height;

        // 2. Extract and resize top row directly in sharp
        const skyStrip = await sharp(srcPath)
          .extract({ left: 0, top: 0, width: w, height: 1 })
          .resize(w, img.skyHeight, { fit: 'fill' })
          .toBuffer();

        // 3. Composite the sky strip and the original image
        const extendedImage = await sharp({
          create: {
            width: w,
            height: h + img.skyHeight,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
          }
        })
        .composite([
          { input: skyStrip, top: 0, left: 0 },
          { input: srcPath, top: img.skyHeight, left: 0 }
        ])
        .png()
        .toBuffer();

        // 4. Save back to the original image path
        fs.writeFileSync(srcPath, extendedImage);
        console.log(`Successfully extended sky for ${img.src}. New dimensions: ${w}x${h + img.skyHeight}`);
      } else {
        console.error(`File not found: ${img.src}`);
      }
    } catch (e) {
      console.error(`Error processing ${img.src}:`, e);
    }
  }
}

run();
