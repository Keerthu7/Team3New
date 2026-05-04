const fs = require('fs');
const path = require('path');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Add priority to Next.js <Image /> components if not already present.
            // Also ensure it doesn't match standard <img> tags.
            const newContent = content.replace(/<Image(?!\s+priority)([\s\S]*?)>/g, (match, p1) => {
                if (p1.includes('priority')) return match;
                modified = true;
                return `<Image priority${p1}>`;
            });

            if (modified) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(process.cwd(), 'components'));
processDir(path.join(process.cwd(), 'app'));
console.log('Done!');
