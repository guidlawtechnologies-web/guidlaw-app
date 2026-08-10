/**
 * Calculate elapsed business hours between a start date and now.
 * Business hours: 9am–5pm ET, Monday–Friday only.
 */

const BUSINESS_START = 9  // 9am
const BUSINESS_END = 17   // 5pm
const TZ_OFFSET = -4      // Eastern Daylight Time (UTC-4). Switch to -5 in winter.

function toET(date: Date): Date {
  return new Date(date.getTime() + TZ_OFFSET * 60 * 60 * 1000)
}

export function elapsedBusinessHours(assignedAt: Date): number {
  const now = new Date()
  let elapsed = 0
  let cursor = new Date(assignedAt.getTime())

  while (cursor < now) {
    const cursorET = toET(cursor)
    const dayOfWeek = cursorET.getUTCDay() // 0=Sun, 6=Sat
    const hour = cursorET.getUTCHours()

    // Skip weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Jump to next Monday 9am ET
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 2
      cursor = new Date(cursor.getTime())
      cursor.setUTCDate(cursor.getUTCDate() + daysUntilMonday)
      cursor.setUTCHours(BUSINESS_START - TZ_OFFSET, 0, 0, 0)
      continue
    }

    // Before business hours — jump to 9am
    if (hour < BUSINESS_START) {
      cursor.setUTCHours(BUSINESS_START - TZ_OFFSET, 0, 0, 0)
      continue
    }

    // After business hours — jump to next day 9am
    if (hour >= BUSINESS_END) {
      cursor.setUTCDate(cursor.getUTCDate() + 1)
      cursor.setUTCHours(BUSINESS_START - TZ_OFFSET, 0, 0, 0)
      continue
    }

    // We're in business hours — count minutes until end of business or now
    const endOfDay = new Date(cursor)
    endOfDay.setUTCHours(BUSINESS_END - TZ_OFFSET, 0, 0, 0)

    const countUntil = now < endOfDay ? now : endOfDay
    elapsed += (countUntil.getTime() - cursor.getTime()) / (1000 * 60 * 60)
    cursor = new Date(countUntil)

    // If we reached end of day, move to next day
    if (cursor >= endOfDay) {
      cursor.setUTCDate(cursor.getUTCDate() + 1)
      cursor.setUTCHours(BUSINESS_START - TZ_OFFSET, 0, 0, 0)
    }
  }

  return elapsed
}

export function isBusinessHours(): boolean {
  const nowET = toET(new Date())
  const day = nowET.getUTCDay()
  const hour = nowET.getUTCHours()
  return day >= 1 && day <= 5 && hour >= BUSINESS_START && hour < BUSINESS_END
}
