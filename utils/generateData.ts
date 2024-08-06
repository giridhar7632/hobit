export function generateChartData(data: any) {
	return data.map((d: any) => ({
		// y: new Date(d.entry_date).getDay(),
		// x: new Date(d.entry_date).getMonth(),
		// value: d.total_time_minutes,
		date: d.entry_date,
		count: d.total_time_minutes,
	}))
}

type DailyActivity = {
	date: string; // ISO date string, e.g., "2023-08-01"
	active: boolean;
};

function fillMissingDates(data: DailyActivity[], startDate: string, endDate: string): DailyActivity[] {
	const filledData: DailyActivity[] = [];
	const start = new Date(startDate);
	const end = new Date(endDate);
	const dateSet = new Set(data.map(item => item.date));

	for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
			const dateStr = d.toISOString().split('T')[0];
			if (dateSet.has(dateStr)) {
					filledData.push(data.find(item => item.date === dateStr) as DailyActivity);
			} else {
					filledData.push({ date: dateStr, active: false });
			}
	}

	return filledData;
}

function calculateStreaks(data: DailyActivity[]): { currentStreak: number; maxStreak: number } {
	let currentStreak = 0;
	let maxStreak = 0;
	let ongoingStreak = 0;

	for (let i = 0; i < data.length; i++) {
			if (data[i].active) {
					ongoingStreak++;
					if (ongoingStreak > maxStreak) {
							maxStreak = ongoingStreak;
					}
			} else {
					ongoingStreak = 0;
			}
	}

	currentStreak = ongoingStreak; // The last ongoing streak is the current streak

	return { currentStreak, maxStreak };
}

// Example usage:
const activityData: DailyActivity[] = [
	{ date: "2023-07-01", active: true },
	{ date: "2023-07-02", active: true },
	{ date: "2023-07-04", active: true },
	{ date: "2023-07-07", active: true }
];

const startDate = "2023-07-01";
const endDate = "2023-07-07";
const filledData = fillMissingDates(activityData, startDate, endDate);
const { currentStreak, maxStreak } = calculateStreaks(filledData);

console.log(`Current Streak: ${currentStreak}`);
console.log(`Max Streak: ${maxStreak}`);
