import Box from '@mui/material/Box'
import { ButtonProps } from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { ReactElement } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 480,
  p: 2,
}
type ModalUpdateUserProps = ButtonProps & {
  modalContent?: ReactElement
  modalTitle?: string | ReactElement
  modalDescription?: string | ReactElement
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
export default function ModalUpdateUser({
  modalContent = <>Popup Modal</>,
  modalTitle = '',
  modalDescription = '',
  open,
  handleOpen,
  handleClose,
}: ModalUpdateUserProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalTitle}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {modalDescription}
        </Typography>
        {modalContent}
      </Box>
    </Modal>
  )
}
