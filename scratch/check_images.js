const sharp = require('sharp');
const path = require('path');

const images = [
  'public/images/project4.png',
  'public/images/project4-mobile.png',
  'public/images/project2.png',
  'public/images/project2-mobile.png',
];

async function check() {
  for (const img of images) {
    try {
      const metadata = await sharp(path.join(process.cwd(), img)).metadata();
      console.log(`${img}: ${metadata.width}x${metadata.height} (${metadata.format})`);
    } catch (e) {
      console.error(`Error reading ${img}:`, e.message);
    }
  }
}

check();
