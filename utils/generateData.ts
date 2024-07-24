export function generateChartData(data: any) {
	return data.map((d: any) => ({
		// y: new Date(d.entry_date).getDay(),
		// x: new Date(d.entry_date).getMonth(),
		// value: d.total_time_minutes,
		date: d.entry_date,
		count: d.total_time_minutes,
	}))
}
