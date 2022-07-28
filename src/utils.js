import { writeFileSync } from 'fs';

export const download = (fileName, fields) => {
	// create file with content
	writeFileSync(fileName, 'fuck');
};
