import { MainLayout } from '@/components/layout'
import * as React from 'react'

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  return <div>Profile Page</div>
}

ProfilePage.Layout = MainLayout
ProfilePage.isPrivate = true
