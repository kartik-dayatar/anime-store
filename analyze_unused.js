
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);
const sourceFiles = allFiles.filter(f => ['.js', '.jsx', '.ts', '.tsx', '.css'].includes(path.extname(f)));

const fileUsage = {};
sourceFiles.forEach(f => {
    fileUsage[f] = 0;
});

// For each file, check if its basename is mentioned in other files
sourceFiles.forEach(fileToCheck => {
    const basename = path.basename(fileToCheck, path.extname(fileToCheck));
    // Skip index files or common names that might give false positives if we are not careful, 
    // but for now let's just check exact string match of basename
    if (basename === 'index' || basename === 'App' || basename === 'main') return;

    sourceFiles.forEach(contentFile => {
        if (fileToCheck === contentFile) return;

        const content = fs.readFileSync(contentFile, 'utf8');
        // Simple check: does the content include the basename?
        // This is a heuristic. 
        if (content.includes(basename)) {
            fileUsage[fileToCheck]++;
        }
    });
});

console.log('--- POTENTIALLY UNUSED FILES ---');
sourceFiles.forEach(f => {
    const basename = path.basename(f, path.extname(f));
    if (basename !== 'index' && basename !== 'App' && basename !== 'main' && fileUsage[f] === 0) {
        console.log(path.relative(srcDir, f));
    }
});
