import { AdminLayout } from '@/components/layout'
import { Box } from '@mui/material'

export interface AdminPageProps {}

export default function AdminPage(props: AdminPageProps) {
  return (
    <Box>
      <h1>Admin Page</h1>
    </Box>
  )
}

AdminPage.Layout = AdminLayout
