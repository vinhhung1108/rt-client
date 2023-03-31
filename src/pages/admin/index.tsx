import { AdminLayout } from '@/components/layout'
import { Box, Stack, Typography } from '@mui/material'

export interface AdminPageProps {}

export default function AdminPage(props: AdminPageProps) {
  return (
    <Box>
      <Stack direction="column">
        <Typography variant="h5">Admin Panel</Typography>
        <Box>
          <Typography>Content for admin dashboard</Typography>
        </Box>
      </Stack>
    </Box>
  )
}

AdminPage.Layout = AdminLayout
AdminPage.isPrivate = true
AdminPage.requiredRoles = ['admin', 'mod']
