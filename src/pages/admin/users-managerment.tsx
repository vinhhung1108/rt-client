import { ListUsers } from '@/components/admin/list-users'
import { AdminLayoutWidthoutSidebar } from '@/components/layout/admin-widthout-sidebar'
import { Box, Stack, Typography } from '@mui/material'

export interface UsersManagermentPageProps {}

export default function UsersManagermentPage(props: UsersManagermentPageProps) {
  return (
    <Box>
      <Stack direction="column">
        <Typography variant="h5">Users Managerment</Typography>
        <Box>
          {/* <Typography>List of Users</Typography> */}
          <ListUsers />
        </Box>
      </Stack>
    </Box>
  )
}

UsersManagermentPage.Layout = AdminLayoutWidthoutSidebar
UsersManagermentPage.isPrivate = true
UsersManagermentPage.requiredRoles = ['admin', 'mod']
