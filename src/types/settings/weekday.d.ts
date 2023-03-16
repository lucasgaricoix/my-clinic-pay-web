export interface WeekdaySettings {
  weekdays: string[]
  weekdaysTimes: TimeRange[]
}

interface Time {
  start?: string
  end?: string
}

interface TimeRange {
  name: string
  label: string
  times: Time[]
}

interface Weekday {
  name: string
  label: string
}
