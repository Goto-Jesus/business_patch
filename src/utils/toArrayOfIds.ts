export const toArrayOfIds = (items: { id: string }[]): number[] =>
	items.map(({ id }) => Number(id));
