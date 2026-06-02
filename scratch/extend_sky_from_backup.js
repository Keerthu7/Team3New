const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, 'backup_images');
const imagesToExtend = [
  {
    name: 'project4.png',
    originalSrc: 'public/images/project4.png',
    width: 1920,
    height: 880, // Cropped height
    skyHeight: 140
  },
  {
    name: 'project2.png',
    originalSrc: 'public/images/project2.png',
    width: 1920,
    height: 880, // Cropped height
    skyHeight: 140
  }
];

async function run() {
  for (const img of imagesToExtend) {
    const backupPath = path.join(backupDir, img.name);
    const originalPath = path.join(process.cwd(), img.originalSrc);

    try {
      if (fs.existsSync(backupPath)) {
        console.log(`Processing ${img.name} from backup: ${backupPath}...`);
        
        // 1. Get metadata of the original cropped file to know current height
        // But since we want to crop the bottom first then extend, let's just do it in one pipeline from the original backup!
        // The original backup is 1920x1080.
        // We want to:
        // - Extract y=0 to y=880 (crops 200px from the bottom)
        // - Extract the top 1px row from backup
        // - Resize the top row to skyHeight (140px)
        // - Create a canvas of 1920x1020 (880 + 140)
        // - Composite them
        
        // Extract cropped building (y=0 to 880) from backup
        const buildingBuffer = await sharp(backupPath)
          .extract({ left: 0, top: 0, width: img.width, height: img.height })
          .toBuffer();

        // Extract top row from backup
        const topRowStrip = await sharp(backupPath)
          .extract({ left: 0, top: 0, width: img.width, height: 1 })
          .resize(img.width, img.skyHeight, { fit: 'fill' })
          .toBuffer();

        // Composite onto new canvas
        const finalImageBuffer = await sharp({
          create: {
            width: img.width,
            height: img.height + img.skyHeight,
            channels: 3,
            background: { r: 255, g: 255, b: 255 }
          }
        })
        .composite([
          { input: topRowStrip, top: 0, left: 0 },
          { input: buildingBuffer, top: img.skyHeight, left: 0 }
        ])
        .png()
        .toBuffer();

        // Save to original path using temp file and rename to avoid lock issues
        const tempOutPath = originalPath + '.tmp';
        fs.writeFileSync(tempOutPath, finalImageBuffer);
        
        // Remove original if exists
        if (fs.existsSync(originalPath)) {
          fs.unlinkSync(originalPath);
        }
        fs.renameSync(tempOutPath, originalPath);
        console.log(`Successfully extended sky for ${img.name}. Output saved to ${img.originalSrc}.`);
      } else {
        console.error(`Backup not found for ${img.name} at ${backupPath}`);
      }
    } catch (e) {
      console.error(`Error processing ${img.name}:`, e);
    }
  }
}

run();
