const convertDate = (input: string): string => {
	const date = new Date(input);

	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthString = monthNames[month];

	const daySuffix =
		day % 10 === 1 && day !== 11
			? "st"
			: day % 10 === 2 && day !== 12
			? "nd"
			: day % 10 === 3 && day !== 13
			? "rd"
			: "th";

	return `${monthString} ${day}${daySuffix} ${year}`;
};

export default convertDate;
