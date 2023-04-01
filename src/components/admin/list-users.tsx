import { Box, Button } from '@mui/material'
import ButtonModal from '../common/button-modal'
import { EnhancedTable } from './table'
import { UserForm } from './user-form'
import UserModal from './user-modal'

export interface ListUsersProps {}

export function ListUsers(props: ListUsersProps) {
  return (
    <div>
      <ButtonModal variant="contained" modalContent={<UserModal />}>
        Create User
      </ButtonModal>
      <EnhancedTable />
    </div>
  )
}
