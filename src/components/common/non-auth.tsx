import { ReactNode } from 'react'

export interface NonAuthProps {
  children: ReactNode
  isPrivate?: boolean
  requiredRoles?: string[]
}
export function NonAuth({ children, isPrivate = true, requiredRoles = undefined }: NonAuthProps) {
  return <div>{children}</div>
}
