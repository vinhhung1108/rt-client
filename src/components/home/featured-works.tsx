import { WorkList } from '@/components/work'
import { Work } from '@/models/work'
import { Box, Container, Typography } from '@mui/material'

export function FeatureWorks() {
  const workList: Work[] = [
    {
      id: '1',
      title: 'Designing Dashboards',
      createdAt: '2023-03-18T22:00:00Z',
      updatedAt: '2023-03-18T22:00:00Z',
      tagList: ['Dashboard'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      thumbnailUrl:
        'https://res.cloudinary.com/dpnrgnzwn/image/upload/v1677860366/Rectangle_30_1_qcyjoy.jpg',
    },
    {
      id: '2',
      title: 'Vibrant Portraits of 2020',
      createdAt: '2023-03-18T22:20:00Z',
      updatedAt: '2023-03-18T22:00:00Z',
      tagList: ['Illustration'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      thumbnailUrl:
        'https://res.cloudinary.com/dpnrgnzwn/image/upload/v1677860366/Rectangle_34_1_vu2hdi.jpg',
    },
    {
      id: '3',
      title: '36 Days of Malayalam type',
      createdAt: '2023-03-18T22:02:00Z',
      updatedAt: '2023-03-18T21:00:00Z',
      tagList: ['Typography'],
      shortDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      thumbnailUrl:
        'https://res.cloudinary.com/dpnrgnzwn/image/upload/v1677860366/Rectangle_32_1_cqgz6t.jpg',
    },
  ]
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5" mb={4}>
          Featured Works
        </Typography>
        <WorkList workList={workList} />
      </Container>
    </Box>
  )
}
