const fs = require('fs');
const path = require('path');
const glob = require('glob');

// You can adjust this pattern to match your source files
const files = glob.sync('./components/**/*.{js,jsx,ts,tsx}');
const regexKeys = /\buseTranslations\(([\s\S]*?)\)/g;
const regexTexts = /\bt\(([\s\S]*?)\)/g;
let results = {};

files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    let matchText;
    while (match = regexKeys.exec(content)) {
        results[match[1]] = {}
        while (matchText = regexTexts.exec(content)) {
            console.log(matchText[1], " matchText");
            results[match[1]][matchText[1]] = ""
            // const formatted = matchText.reduce((acc, next) => {
            //     acc[next] = " "
            //     return acc;
            // }, {});
            // results[match[results.length - 1]] = {...results[match[results.length - 1]], ...formatted}
        }
    }
});

// Write results to json
fs.writeFileSync('results3.json', JSON.stringify(results, null, 2));