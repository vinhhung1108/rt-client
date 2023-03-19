import { format } from 'date-fns'

export interface DayProps {
  dateString: string
}

export function Day({ dateString }: DayProps) {
  const date = new Date(Number.parseInt(dateString))
  return <time dateTime={dateString}>{format(date, 'dd')}</time>
}
