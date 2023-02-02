export function getDaysAgo(numberOfDays: number = 10, fromDay: Date = new Date()){
    let daysAgo = fromDay;
	daysAgo.setDate(daysAgo.getDate() - numberOfDays);
	return daysAgo;
};