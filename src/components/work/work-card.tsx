import { Work } from '@/models/work'
import { Chip, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { format } from 'date-fns'
import Image from 'next/image'

export interface WorkCardProps {
  work: Work
}

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Box width={{ xs: '100%', sm: '246px' }} flexShrink={0}>
        <Image src={work.thumbnailUrl} alt="work thumbnakl" width={246} height={180} />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="bold">
          {work.title}
        </Typography>
        <Stack direction="row" my={2}>
          <Chip
            color="secondary"
            // label={<Year dateString={work.createdAt} />}
            label={format(new Date(work.createdAt), 'yyyy')}
            size="small"
          />
          <Typography ml={3} color="GrayText" variant="body2">
            {work.tagList.join(', ')}
          </Typography>
        </Stack>
        <Typography>{work.shortDescription}</Typography>
      </Box>
    </Stack>
  )
}
