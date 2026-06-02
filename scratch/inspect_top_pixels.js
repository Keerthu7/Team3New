const sharp = require('sharp');
const path = require('path');

async function run() {
  const imgPath = path.join(process.cwd(), 'public/images/project4.png');
  const image = sharp(imgPath);
  const metadata = await image.metadata();

  // Get raw pixels of the top-left, top-middle, and top-right of the image
  // We can extract a 1x5 region from the top edge
  const buffer = await image
    .raw()
    .toBuffer();

  const width = metadata.width;
  // Get pixel color at (x, 0)
  const getPixel = (x, y) => {
    const idx = (y * width + x) * 3; // RGB
    return {
      r: buffer[idx],
      g: buffer[idx + 1],
      b: buffer[idx + 2]
    };
  };

  console.log("Top-left pixel:", getPixel(0, 0));
  console.log("Top-middle pixel:", getPixel(Math.floor(width / 2), 0));
  console.log("Top-right pixel:", getPixel(width - 1, 0));
}

run();
