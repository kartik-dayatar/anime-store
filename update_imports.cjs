
const fs = require('fs');
const path = require('path');

const pagesDir = path.join(process.cwd(), 'src', 'pages');

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

const allFiles = getAllFiles(pagesDir);

allFiles.forEach(file => {
    if (file.endsWith('.jsx') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf8');
        let updated = false;

        // Replace imports that go up one level
        // e.g. import ... from '../components/...' becomes '../../components/...'
        // specific folders we know are in src: components, data, store, utils, context, assets

        const folders = ['components', 'data', 'store', 'utils', 'context', 'assets', 'ui'];

        folders.forEach(folder => {
            const regex = new RegExp(`from ['"]\.\./${folder}`, 'g');
            if (regex.test(content)) {
                content = content.replace(regex, `from '../../${folder}`);
                updated = true;
            }
            const importRegex = new RegExp(`import ['"]\.\./${folder}`, 'g'); // for side-effect imports
            if (importRegex.test(content)) {
                content = content.replace(importRegex, `import '../../${folder}`);
                updated = true;
            }
        });

        // Also check if any page imports another page?
        // e.g. import Checkout from './Checkout' might break if they were siblings and now valid, but imports from DIFFERENT categories would change.
        // But we are Lazy loading in App.jsx mostly.
        // Internal page imports are rare in this project based on review, usually specific components.

        if (updated) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated imports in ${path.relative(process.cwd(), file)}`);
        }
    }
});
