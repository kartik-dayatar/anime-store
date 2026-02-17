
const fs = require('fs');
const path = require('path');

// Use process.cwd() to be sure
const srcDir = path.join(process.cwd(), 'src');
console.log('Scanning directory:', srcDir);

function getAllFiles(dirPath, arrayOfFiles) {
    if (!fs.existsSync(dirPath)) {
        console.log('Directory not found:', dirPath);
        return [];
    }
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
    console.log(`Found ${sourceFiles.length} source files.`);

    const fileUsage = {};
    const baseNames = {};

    sourceFiles.forEach(f => {
        const base = path.basename(f, path.extname(f));
        fileUsage[f] = 0;
        // Map basename to file path(s) - handling duplicates if any
        if (!baseNames[base]) baseNames[base] = [];
        baseNames[base].push(f);
    });

    // Scan content
    sourceFiles.forEach(contentFile => {
        const content = fs.readFileSync(contentFile, 'utf8');

        // Ensure we check every other file against this content
        Object.keys(baseNames).forEach(base => {
            // Heuristic Not Perfect: Simple string match of component name / filename
            if (base === 'index' || base === 'App' || base === 'main' || base.startsWith('vite')) return;

            // Regex or robust check? Simple includes is faster but prone to false positives (good for "unused" check as it's conservative)
            // If content includes 'MyComponent', we assume it *might* use MyComponent
            if (content.includes(base)) {
                baseNames[base].forEach(f => {
                    if (f !== contentFile) fileUsage[f]++;
                });
            }
        });
    });

    console.log('--- POTENTIALLY UNUSED FILES ---');
    let unusedCount = 0;
    sourceFiles.forEach(f => {
        const base = path.basename(f, path.extname(f));
        // Filter out core files
        if (base === 'index' || base === 'App' || base === 'main') return;

        if (fileUsage[f] === 0) {
            console.log(path.relative(srcDir, f));
            unusedCount++;
        }
    });

    if (unusedCount === 0) console.log("No unused files found (heuristic).");

} catch (e) {
    console.error("Error executing script:", e);
}
