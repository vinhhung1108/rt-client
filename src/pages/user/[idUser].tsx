import { AdminLayout, UserLayout } from '@/components/layout'
import { useUsers } from '@/hooks'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  const router = useRouter()
  const { idUser } = router.query
  const { userDetail } = useUsers()
  const profile = idUser && !Array.isArray(idUser) ? userDetail(idUser) : null
  return
  ;<Box>
    <Typography>User Detail {profile?.username} </Typography>
  </Box>
}

ProfilePage.Layout = AdminLayout
ProfilePage.isPrivate = true
