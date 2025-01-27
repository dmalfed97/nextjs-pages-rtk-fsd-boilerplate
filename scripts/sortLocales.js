const fs = require('fs');
const path = require('path');


function sortObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  }

  const sortedObj = {};
  Object.keys(obj).sort().forEach((key) => {
    sortedObj[key] = sortObject(obj[key]);
  });

  return sortedObj;
}


function sortJsonFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error while reading the file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      const sortedJson = sortObject(jsonData);

      fs.writeFile(filePath, JSON.stringify(sortedJson, null, 2), (err) => {
        if (err) {
          console.error('Error while file rewriting:', err);
        }
      });
    } catch (err) {
      console.error(`Error while JSON parsing in file ${filePath}:`, err);
    }
  });
}


function sortAllJsonFilesInDirectory(dirPath) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Could not receive the directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name);

      if (file.isDirectory()) {
        sortAllJsonFilesInDirectory(filePath);
      } else if (file.name.endsWith('.json')) {
        sortJsonFile(filePath);
      }
    });
  });
}

const directoryPath = path.join(__dirname, '..', 'public/locales');

sortAllJsonFilesInDirectory(directoryPath);
