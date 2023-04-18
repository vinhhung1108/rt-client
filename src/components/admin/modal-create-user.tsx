import React, { ReactElement, useState } from 'react'
import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 480,
  p: 2,
}
type ModalCreateUserProps = ButtonProps & {
  modalContent?: ReactElement
  modalTitle?: string | ReactElement
  modalDescription?: string | ReactElement
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}
export default function ModalCreateUser({
  modalContent = <>Popup Modal</>,
  modalTitle = '',
  modalDescription = '',
  open,
  handleOpen,
  handleClose,
}: ModalCreateUserProps) {
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
