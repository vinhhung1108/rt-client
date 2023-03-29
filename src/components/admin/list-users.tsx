import { TimeByMilliseconds } from '@/constants'
import { useUsers } from '@/hooks'
import { EnhancedTable } from './table'

export interface ListUsersProps {}

export function ListUsers(props: ListUsersProps) {
  const { users } = useUsers({ dedupingInterval: TimeByMilliseconds.SECOND * 5 }, 1, 0)
  return (
    <div>
      <EnhancedTable users={users || []} />
    </div>
  )
}
