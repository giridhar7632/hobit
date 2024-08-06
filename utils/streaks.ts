import { DailyEntry, fillMissingDates } from './generateData'

type Streak = {
  currentStreak: number
  maxStreak: number
}

export function calculateStreaks(activityData: DailyEntry[]): Streak {
  const data = fillMissingDates(activityData)

  let currentStreak = 0
  let maxStreak = 0
  let ongoingStreak = 0

  for (let i = 0; i < data.length; i++) {
    if (data[i].count > 0) {
      ongoingStreak++
      if (ongoingStreak > maxStreak) {
        maxStreak = ongoingStreak
      }
    } else {
      ongoingStreak = 0
    }
  }

  currentStreak = ongoingStreak

  return { currentStreak, maxStreak }
}
