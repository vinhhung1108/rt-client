import { AdminLayout } from '@/components/layout'
import { useUser } from '@/hooks'
import { User } from '@/models'
import { Box, Button, Typography } from '@mui/material'
import { profile } from 'console'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  const router = useRouter()
  const { idUser } = router.query
  const { user, isLoading } = useUser({ dedupingInterval: 2 }, idUser?.toString())

  if (isLoading) return <Box>Loading</Box>
  if (!user) return <Box>No Profile data</Box>
  function handleClickBack() {
    router.back()
  }
  return (
    <Box>
      <Button onClick={handleClickBack}>Back to list</Button>
      <Typography variant="h4">User Detail</Typography>
      <Typography>Username: {user?.username} </Typography>
      <Typography>Email: {user?.email} </Typography>
    </Box>
  )
}

ProfilePage.Layout = AdminLayout
ProfilePage.isPrivate = true
