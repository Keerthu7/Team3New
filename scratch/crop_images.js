const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, 'backup_images');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const imagesToCrop = [
  {
    name: 'project4.png',
    src: 'public/images/project4.png',
    // 1920x1080 -> Crop bottom. Let's crop from y=0 to y=880 (removing bottom 200px of paving/cars)
    width: 1920,
    height: 880,
    left: 0,
    top: 0
  },
  {
    name: 'project4-mobile.png',
    src: 'public/images/project4-mobile.png',
    // 853x1844 -> Crop bottom ground. Let's crop from y=0 to y=1500 (removing bottom 344px)
    width: 853,
    height: 1500,
    left: 0,
    top: 0
  },
  {
    name: 'project2.png',
    src: 'public/images/project2.png',
    // 1920x1080 -> Crop bottom road. Let's crop from y=0 to y=880 (removing bottom 200px)
    width: 1920,
    height: 880,
    left: 0,
    top: 0
  },
  {
    name: 'project2-mobile.png',
    src: 'public/images/project2-mobile.png',
    // 853x1844 -> Crop bottom road. Let's crop from y=0 to y=1500 (removing bottom 344px)
    width: 853,
    height: 1500,
    left: 0,
    top: 0
  }
];

async function run() {
  for (const img of imagesToCrop) {
    const srcPath = path.join(process.cwd(), img.src);
    const backupPath = path.join(backupDir, img.name);

    try {
      if (fs.existsSync(srcPath)) {
        // Backup if not already backed up
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(srcPath, backupPath);
          console.log(`Backed up: ${img.name} -> scratch/backup_images/${img.name}`);
        }

        // Crop the image
        const tempPath = srcPath + '.tmp';
        await sharp(backupPath)
          .extract({ left: img.left, top: img.top, width: img.width, height: img.height })
          .toFile(tempPath);

        // Replace original with cropped
        fs.renameSync(tempPath, srcPath);
        console.log(`Cropped and replaced: ${img.src} to dimensions ${img.width}x${img.height}`);
      } else {
        console.error(`File not found: ${img.src}`);
      }
    } catch (e) {
      console.error(`Error processing ${img.name}:`, e);
    }
  }
}

run();
