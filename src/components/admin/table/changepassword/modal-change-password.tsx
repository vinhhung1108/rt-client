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
type ModalChangePasswordProps = ButtonProps & {
  modalContent?: ReactElement
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
export default function ModalChangePassword({
  modalContent = <>Popup Modal</>,
  open,
  handleOpen,
  handleClose,
}: ModalChangePasswordProps) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Title modal here
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Modal description
        </Typography>
        {modalContent}
      </Box>
    </Modal>
  )
}
