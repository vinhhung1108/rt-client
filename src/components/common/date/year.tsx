import { format } from 'date-fns'

export interface YearProps {
  dateString: string
}

export function Year({ dateString }: YearProps) {
  const date = new Date(Number.parseInt(dateString))
  return <time dateTime={dateString}>{format(date, 'yyyy')}</time>
}
