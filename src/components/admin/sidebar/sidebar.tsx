import { Box, Stack, Typography } from '@mui/material'
import { NestedList } from './nested-list'

export interface SideBarAdminProps {}

export function SideBarAdmin(props: SideBarAdminProps) {
  return (
    <Box sx={{ width: '300px', pt: '20px' }}>
      <Stack>
        <NestedList />
      </Stack>
    </Box>
  )
}
