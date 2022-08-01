import { appendFileSync } from 'fs';

export const download = (fileName, data) => {
	data.map((element) => {
		appendFileSync(fileName, `${element.key}="${element.value}"\n\n`, 'utf-8');

		return null;
	});
};
