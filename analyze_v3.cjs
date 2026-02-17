
const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const REPORT_FILE = 'unused_final.txt';

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) return [];
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

try {
    const allFiles = getAllFiles(srcDir);
    const sourceFiles = allFiles.filter(f => ['.js', '.jsx', '.ts', '.tsx', '.css'].includes(path.extname(f)));

    const fileUsage = {};
    const baseNames = {};

    sourceFiles.forEach(f => {
        const base = path.basename(f, path.extname(f));
        fileUsage[f] = 0;
        if (!baseNames[base]) baseNames[base] = [];
        baseNames[base].push(f);
    });

    sourceFiles.forEach(contentFile => {
        const content = fs.readFileSync(contentFile, 'utf8');
        Object.keys(baseNames).forEach(base => {
            if (base === 'index' || base === 'App' || base === 'main' || base.startsWith('vite')) return;
            if (content.includes(base)) {
                baseNames[base].forEach(f => {
                    if (f !== contentFile) fileUsage[f]++;
                });
            }
        });
    });

    const unusedFiles = [];
    sourceFiles.forEach(f => {
        const base = path.basename(f, path.extname(f));
        if (base === 'index' || base === 'App' || base === 'main') return;
        if (fileUsage[f] === 0) {
            unusedFiles.push(path.relative(srcDir, f));
        }
    });

    fs.writeFileSync(REPORT_FILE, "--- UNUSED FILES REPORT ---\n" + (unusedFiles.length > 0 ? unusedFiles.join('\n') : "No unused files found."), 'utf8');
    console.log("Report written to " + REPORT_FILE);

} catch (e) {
    fs.writeFileSync(REPORT_FILE, "Error: " + e.message, 'utf8');
}
