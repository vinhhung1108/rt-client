import { TimeByMilliseconds } from '@/constants'
import { useUsers } from '@/hooks'
import { ChangePasswordPayload, User, UserPayload, UserUpdatePayload } from '@/models'
import { getErrorMessage } from '@/utils/error-with-message'
import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { EnhancedTableHead, Order, getComparator, stableSort } from './enhanced-table-head'
import { EnhancedTableToolbar } from './enhaned-table-toolbar'
import ModalUpdateUser from './modal-update-user'
import UpdateUserModalContent from './update-user-modal-content'
import { useRouter } from 'next/router'
import ModalChangePassword from './changepassword/modal-change-password'
import ChangePasswordContent from './changepassword/change-password-content'

export function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof User>('userId')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [pageApi, setPageApi] = useState(1)
  const [limitApi, setLimitApi] = useState(0)

  const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false)
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false)

  const [dataUserUpdate, setDataUserUpdate] = useState<UserUpdatePayload | null>(null)
  const [dataChangePassword, setDataChangePassword] = useState<ChangePasswordPayload | null>(null)

  const handleOpen = () => setOpenModalUpdateUser(true)
  const handleClose = () => setOpenModalUpdateUser(false)
  const openChangePassword = () => setOpenModalChangePassword(true)
  const closeChangePassword = () => setOpenModalChangePassword(false)

  const router = useRouter()
  const { users, updateUser, mutate, changePassword } = useUsers(
    { dedupingInterval: TimeByMilliseconds.SECOND * 5 },
    pageApi,
    limitApi
  )
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 480,
    p: 2,
  }
  const handleClickUpdate = (dataUpdate: UserUpdatePayload) => {
    const { username, email, isActive, isCreateAble, roles, _id } = dataUpdate
    const data: UserUpdatePayload = {
      username,
      email,
      isActive,
      isCreateAble,
      roles,
      _id,
    }
    console.log('Update button clicked:', data)
    setDataUserUpdate(data)
    handleOpen()
  }
  const handleClickChangePassword = (data: UserUpdatePayload) => {
    const { _id, username } = data
    let password = ''
    let confirmPassword = ''
    setDataChangePassword({ _id, username, password, confirmPassword })
    openChangePassword()
  }
  async function handleUserUpdateSubmit(payload: UserUpdatePayload) {
    try {
      await updateUser(payload)
      await mutate()
      handleClose()
    } catch (error: unknown) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  async function handleChangePasswordSubmit(payload: ChangePasswordPayload) {
    try {
      await changePassword(payload)
      await mutate()
      closeChangePassword()
    } catch (error: unknown) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }

  const rows = Array.isArray(users) ? users : []

  const checkRowsCurrentPage = (x: number, page: number, rowsPerPage: number) => {
    return x >= page * rowsPerPage && x < (page + 1) * rowsPerPage
  }
  const current_rows = rows.filter((row, index) => checkRowsCurrentPage(index, page, rowsPerPage))

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = current_rows.map((n) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClearSelected = () => {
    setSelected([])
  }

  const handleClickCheckbox = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleClickRow = (event: React.MouseEvent<unknown>, id: string) => {
    router.push(`/user/${id}`)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} handleClearSelected={handleClearSelected} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowsPerPage={rowsPerPage}
              rowsCurrentPage={current_rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      onClick={(event) => handleClickRow(event, row._id)}
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        <Checkbox
                          onClick={(event) => handleClickCheckbox(event, row._id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.userId}
                      </TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.roles.toString()}</TableCell>
                      <TableCell align="left">{row.isCreateAble.toString()}</TableCell>
                      <TableCell align="left">{row.isActive.toString()}</TableCell>
                      <TableCell align="left">{row.isLoggedIn?.toString()}</TableCell>
                      <TableCell align="left">{row.lastLogin?.toString()}</TableCell>
                      <TableCell align="left">{row.clientApp?.toString()}</TableCell>
                      <TableCell
                        align="right"
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                      >
                        <Button onClick={() => handleClickUpdate({ ...row })}>Edit</Button>
                        <Button onClick={() => handleClickChangePassword({ ...row })}>
                          Change Password
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ModalUpdateUser
          open={openModalUpdateUser}
          handleOpen={handleOpen}
          handleClose={handleClose}
          variant="contained"
          modalContent={
            <UpdateUserModalContent
              dataUserUpdate={dataUserUpdate}
              handleUserSubmit={handleUserUpdateSubmit}
            />
          }
        />

        <ModalChangePassword
          open={openModalChangePassword}
          handleOpen={openChangePassword}
          handleClose={closeChangePassword}
          variant="contained"
          modalContent={
            <ChangePasswordContent
              dataChangePassword={dataChangePassword}
              onSubmit={handleChangePasswordSubmit}
            />
          }
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
