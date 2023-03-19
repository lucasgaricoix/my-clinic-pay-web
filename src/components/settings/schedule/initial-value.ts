import { TimeInterval } from "@/types/settings/schedule";

export const weekdayTimesData: TimeInterval[] = [
  {
    name: 'sunday',
    label: 'DOM',
    intervals: [{ from: undefined, to: undefined }],
  },
  {
    name: 'monday',
    label: 'SEG',
    intervals: [{ from: '08:00', to: '18:00' }],
  },
  {
    name: 'tuesday',
    label: 'TER',
    intervals: [{ from: '08:00', to: '18:00' }],
  },
  {
    name: 'wednesday',
    label: 'QUA',
    intervals: [{ from: '08:00', to: '18:00' }],
  },
  {
    name: 'thursday',
    label: 'QUI',
    intervals: [{ from: '08:00', to: '18:00' }],
  },
  {
    name: 'friday',
    label: 'SEX',
    intervals: [{ from: '08:00', to: '18:00' }],
  },
  {
    name: 'saturday',
    label: 'SAB',
    intervals: [{ from: undefined, to: undefined }],
  },
]
