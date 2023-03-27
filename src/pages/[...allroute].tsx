import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface CatchAllRouteProps {}

export default function CatchAllRoute(props: CatchAllRouteProps) {
  const router = useRouter()
  useEffect(() => {
    console.log('Catch all route')
    router.push('/')
  })
  return <div></div>
}
