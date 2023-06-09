import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface CatchAllRouteProps {}

export default function CatchAllRoute(props: CatchAllRouteProps) {
  const router = useRouter()
  useEffect(() => {
    router.push('/')
  })
  return <div></div>
}
