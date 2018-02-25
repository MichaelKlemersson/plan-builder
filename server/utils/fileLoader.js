import fs from 'fs';

export const loadFile = (file) => {
    return JSON.parse(fs.readFileSync(file))
}