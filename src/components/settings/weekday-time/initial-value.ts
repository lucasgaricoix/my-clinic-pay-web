import { TimeRange } from "@/types/settings/weekday-time";

export const weekdayTimesData: TimeRange[] = [
  {
    name: 'sunday',
    label: 'DOM',
    times: [{ start: undefined, end: undefined }],
  },
  {
    name: 'monday',
    label: 'SEG',
    times: [{ start: '08:00', end: '18:00' }],
  },
  {
    name: 'tuesday',
    label: 'TER',
    times: [{ start: '08:00', end: '18:00' }],
  },
  {
    name: 'wednesday',
    label: 'QUA',
    times: [{ start: '08:00', end: '18:00' }],
  },
  {
    name: 'thursday',
    label: 'QUI',
    times: [{ start: '08:00', end: '18:00' }],
  },
  {
    name: 'friday',
    label: 'SEX',
    times: [{ start: '08:00', end: '18:00' }],
  },
  {
    name: 'saturday',
    label: 'SAB',
    times: [{ start: undefined, end: undefined }],
  },
]
