export type DailyEntry = {
  date: string
  count: number
}

export function generateChartData(data: any) {
  return data.map((d: any) => ({
    // y: new Date(d.entry_date).getDay(),
    // x: new Date(d.entry_date).getMonth(),
    // value: d.total_time_minutes,
    date: d.entry_date,
    count: d.total_time_minutes,
  }))
}

export function fillMissingDates(data: DailyEntry[]): DailyEntry[] {
  const filledData: DailyEntry[] = []
  const dateSet = new Set(data.map((item) => item.date))
  const end = new Date(data[0].date)
  const start = new Date(data[data.length - 1].date)

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]
    if (dateSet.has(dateStr)) {
      filledData.push(data.find((item) => item.date === dateStr) as DailyEntry)
    } else {
      filledData.push({ date: dateStr, count: 0 })
    }
  }

  return filledData
}
