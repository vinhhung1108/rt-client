import { MainLayout } from '@/components/layout'
import * as React from 'react'

export interface PostsListProps {}

export default function PostsList(props: PostsListProps) {
  return <div>PostsList Page</div>
}

PostsList.Layout = MainLayout
PostsList.isPrivate = false
