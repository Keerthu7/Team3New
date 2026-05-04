const fs = require('fs');
let content = fs.readFileSync('components/AdminBlogsClient.tsx', 'utf8');
content = content.replace(/onUpload=\{\(url\) => setFormData\(\{\.\.\.formData, ([a-zA-Z0-9_]+): url\}\)\}/g, 'onUpload={(url) => setFormData((prev: any) => ({...prev, $1: url}))}');
fs.writeFileSync('components/AdminBlogsClient.tsx', content);
