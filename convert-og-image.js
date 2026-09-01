const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertOgImage() {
  try {
    const inputPath = path.join(__dirname, 'public', 'og-image.svg');
    const outputPath = path.join(__dirname, 'public', 'og-image.png');

    console.log('Converting og-image.svg to PNG...');

    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 15, g: 17, b: 23, alpha: 1 }
      })
      .png({ quality: 85 })
      .toFile(outputPath);

    console.log(`✓ Created og-image.png (1200×630px)`);
    console.log(`Output: ${outputPath}`);

    // Update metadata in layout.tsx to use PNG
    const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
    let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    layoutContent = layoutContent.replace(/\/og-image\.svg/g, '/og-image.png');
    fs.writeFileSync(layoutPath, layoutContent);

    console.log('✓ Updated app/layout.tsx to use og-image.png');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

convertOgImage();
