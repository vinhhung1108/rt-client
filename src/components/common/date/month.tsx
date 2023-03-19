import { format } from 'date-fns'

export interface MonthProps {
  dateString: string
}

export function Month({ dateString }: MonthProps) {
  const date = new Date(Number.parseInt(dateString))
  return <time dateTime={dateString}>{format(date, 'mm')}</time>
}
