const dateToString = (input: string): string => {
	const date = new Date(input);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const formattedYear = year.toString().padStart(4, "0");
	const formattedMonth = month.toString().padStart(2, "0");
	const formattedDay = day.toString().padStart(2, "0");

	return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

export default dateToString;
