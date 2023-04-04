import { useUsers } from '@/hooks'
import { UserPayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ButtonModal from '../common/button-modal'
import { EnhancedTable } from './table'
import UserModal from './user-modal'

export interface ListUsersProps {}

export function ListUsers(props: ListUsersProps) {
  const { createUser, mutate } = useUsers()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  async function handleUserSubmit(payload: UserPayload) {
    try {
      console.log(payload)
      await createUser(payload)
      await mutate()
      handleClose()
    } catch (error: unknown) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }
  return (
    <div>
      <ButtonModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        variant="contained"
        modalContent={<UserModal handleUserSubmit={handleUserSubmit} />}
      >
        Create User
      </ButtonModal>
      <EnhancedTable />
    </div>
  )
}
