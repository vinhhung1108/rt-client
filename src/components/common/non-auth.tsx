import { TimeByMilliseconds } from '@/constants'
import { useAuth } from '@/hooks'
import { Box, Container, LinearProgress, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useSWRConfig } from 'swr'

export interface NonAuthProps {
  children: ReactNode
  isPrivate?: boolean
  requiredRoles?: string[]
}
export function NonAuth({ children, isPrivate = true, requiredRoles = undefined }: NonAuthProps) {
  return <div>{children}</div>
}
