import { Box, Button } from '@mui/material'
import ButtonModal from '../common/button-modal'
import { EnhancedTable } from './table'

export interface ListUsersProps {}
function handleAddUserClick() {
  return ''
}

export function Modal() {
  return <Box>Hello Modal</Box>
}
export function ListUsers(props: ListUsersProps) {
  return (
    <div>
      <ButtonModal
        variant="contained"
        onClick={handleAddUserClick}
        label="Add User"
        modalContent={<Modal />}
      />
      <EnhancedTable />
    </div>
  )
}
