interface Interval {
  from?: string
  to?: string
}

interface TimeInterval {
  name: string
  label: string
  intervals: Interval[]
}
export interface ScheduleSettings {
  weekdays: string[]
  rules: TimeInterval[]
}

export interface TimeRangeProps {
  values: ScheduleSettings
  intervals: Interval[]
  mainIndex: number
  childIndex: number
  lastIndex: boolean
  weekdayName: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}
