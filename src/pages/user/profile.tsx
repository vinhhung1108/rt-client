import { UserLayout } from '@/components/layout'

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  return <div>Profile Page</div>
}

ProfilePage.Layout = UserLayout
ProfilePage.isPrivate = true
