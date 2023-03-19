import { useAuth } from '@/hooks'
import { LayoutProps } from '@/models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Auth } from '../common'

export function AdminLayout({ children }: LayoutProps) {
  const { profile, logout } = useAuth()
  const router = useRouter()
  async function handleLogoutClick() {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.log('Failed to logout ', error)
    }
  }

  return (
    <Auth>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>
      <p>Profile: {JSON.stringify(profile)}</p>
      <div>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>{children}</div>
    </Auth>
  )
}
