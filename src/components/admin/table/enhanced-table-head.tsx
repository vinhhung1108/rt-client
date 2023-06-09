import { User, UserTable } from '@/models'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import React from 'react'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export type Order = 'asc' | 'desc'

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | string[] | boolean },
  b: { [key in Key]: number | string | string[] | boolean }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: keyof UserTable
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'userId',
    numeric: false,
    disablePadding: true,
    label: 'UserID',
  },
  {
    id: 'username',
    numeric: false,
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'roles',
    numeric: false,
    disablePadding: false,
    label: 'Roles',
  },
  {
    id: 'isCreateAble',
    numeric: false,
    disablePadding: false,
    label: 'IsCreateAble',
  },
  {
    id: 'isActive',
    numeric: false,
    disablePadding: false,
    label: 'IsActive',
  },
  {
    id: 'isLoggedIn',
    numeric: false,
    disablePadding: false,
    label: 'IsLoggedIn',
  },
  {
    id: 'lastLogin',
    numeric: false,
    disablePadding: false,
    label: 'LastLogin',
  },
  {
    id: 'clientApp',
    numeric: false,
    disablePadding: false,
    label: 'ClientApp',
  },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof User) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  rowsPerPage: number
  rowsCurrentPage: number
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    rowsPerPage,
    rowsCurrentPage,
  } = props

  const createSortHandler = (property: keyof User) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            indeterminate={numSelected > 0 && numSelected < rowsPerPage}
            // checked={rowCount > 0 && numSelected === rowCount}
            checked={rowsCurrentPage > 0 && numSelected === rowsCurrentPage}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map(
          (headCell) =>
            headCell.id !== 'actions' && (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
        )}
        <TableCell padding="normal"></TableCell>
      </TableRow>
    </TableHead>
  )
}
