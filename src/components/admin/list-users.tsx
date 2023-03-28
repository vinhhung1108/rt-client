import { useUsers } from '@/hooks'
import * as React from 'react'

export interface ListUsersProps {}

export function ListUsers(props: ListUsersProps) {
  const { users } = useUsers({}, 2, 10)
  console.log(users)
  return (
    <div>
      <ul>{users && users.map((user) => <li key={user.userId}>{user.username}</li>)}</ul>
    </div>
  )
}
