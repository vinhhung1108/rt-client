import { useUsers } from '@/hooks'
import { UserPayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { Button } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import CreateUserModalContent from './create-user-modal-content'
import ModalCreateUser from './modal-create-user'
import { EnhancedTable } from './table'

export interface ListUsersProps {}

export function ListUsers(props: ListUsersProps) {
  const { createUser, mutate } = useUsers()
  const [openModalCreateUser, setOpenModalCreateUser] = useState(false)
  const handleOpen = () => setOpenModalCreateUser(true)
  const handleClose = () => setOpenModalCreateUser(false)

  async function handleUserSubmit(payload: UserPayload) {
    try {
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
      <ModalCreateUser
        open={openModalCreateUser}
        handleOpen={handleOpen}
        handleClose={handleClose}
        variant="contained"
        modalContent={<CreateUserModalContent handleUserSubmit={handleUserSubmit} />}
      />
      <Button onClick={handleOpen}>Create User</Button>

      <EnhancedTable />
    </div>
  )
}
