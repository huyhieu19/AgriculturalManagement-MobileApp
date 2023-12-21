async function sleep(ms: number) {
	await new Promise((r) => setTimeout(r, ms));
}

const formatGetOnlyDate = (date: any) => {
	const dateString = date;
	const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleDateString();
	return formattedDate;
};

function formatGetOnlyDateDisplay(date: any) {
  const dateString = date;
  const dateObject = new Date(dateString);

  const formattedDate = dateObject.toLocaleString();
  return formattedDate;
}


export { sleep, formatGetOnlyDate, formatGetOnlyDateDisplay };
