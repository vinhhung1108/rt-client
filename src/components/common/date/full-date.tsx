import { format } from 'date-fns'

export interface FullDateProps {
  dateString: string
}

export function FullDate({ dateString }: FullDateProps) {
  const date = new Date(Number.parseInt(dateString))
  return <time dateTime={dateString}>{format(date, 'dd/mm/yyyy')}</time>
}
