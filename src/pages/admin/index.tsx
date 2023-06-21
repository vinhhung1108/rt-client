import { AdminLayoutWidthoutSidebar } from '@/components/layout/admin-widthout-sidebar'
import { Box, Stack, Typography } from '@mui/material'
import UsersManagermentPage from './users-managerment'

export interface AdminPageProps {}

export default function AdminPage(props: AdminPageProps) {
  return (
    <Box>
      <Stack direction="column">
        {/* <Typography variant="h5">Admin Panel</Typography>
        <Box>
          <Typography>Content for admin dashboard</Typography>
        </Box> */}
        <UsersManagermentPage />
      </Stack>
    </Box>
  )
}

// AdminPage.Layout = AdminLayout
AdminPage.Layout = AdminLayoutWidthoutSidebar
AdminPage.isPrivate = true
AdminPage.requiredRoles = ['admin', 'mod']
