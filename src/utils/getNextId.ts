export const getNextId = (items: number[]): string => {
	if (items.length > 0) {
		return String(Math.max(...items) + 1)
	}

	return '1';
};