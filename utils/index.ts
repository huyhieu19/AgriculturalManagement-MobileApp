async function sleep(ms: number) {
	await new Promise((r) => setTimeout(r, ms));
}

const formatDateTime = (date: any) => {
	const dateString = date;
	const dateObject = new Date(dateString);

	const formattedDate = dateObject.toISOString().split("T")[0];
	return formattedDate;
};
export { sleep, formatDateTime };
