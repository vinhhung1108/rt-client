import { Inter } from 'next/font/google'

import { Seo } from '@/components/common'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models'
import { Box } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <Seo
        data={{
          title: 'RT Home Page',
          description: 'Home page with description SEO',
          url: 'https://localhost:3000',
          thumbnailUrl:
            'https://res.cloudinary.com/dpnrgnzwn/image/upload/v1677860366/Rectangle_30_1_qcyjoy.jpg',
        }}
      />
      <h1>Home Page</h1>
    </Box>
  )
}

Home.Layout = MainLayout

export default Home
