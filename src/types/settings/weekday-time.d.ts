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

export interface TimeRangeProps {
  values: WeekdaySettings
  times: Time[]
  mainIndex: number
  childIndex: number
  lastIndex: boolean
  weekdayName: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  setFieldTouched: (field: string, touched: boolean) => void
}
