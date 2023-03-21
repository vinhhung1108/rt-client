import { Post } from '@/models'
import { Divider, Stack, Typography } from '@mui/material'
import { Box } from '@mui/material'
import { format } from 'date-fns'

export interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold">
        {post.title}
      </Typography>
      <Stack sx={{ my: 2 }} direction="row">
        <Typography variant="body2">
          {format(new Date(post.publishedDate), 'dd MMM yyyy')}
          {/* <FullDate dateString={post.publishedDate} /> */}
        </Typography>
        <Divider flexItem orientation="vertical" sx={{ mx: 2 }} />
        <Typography variant="body2">{post.tagList.join(', ')}</Typography>
      </Stack>
      <Typography variant="body1">{post.description}</Typography>
    </Box>
  )
}
