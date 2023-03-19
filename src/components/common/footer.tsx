import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Box, Icon, Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'

export function Footer() {
  const socialLink = [
    { icon: Facebook, url: 'https://google.com' },
    { icon: Instagram, url: 'https://google.com' },
    { icon: Twitter, url: 'https://google.com' },
    { icon: LinkedIn, url: 'https://google.com' },
  ]
  return (
    <Box component="footer" textAlign="center" py={2}>
      <Stack direction="row" justifyContent="center">
        {socialLink.map((item, index) => (
          <Box key={index} p={2}>
            <MuiLink component={Link} href={item.url} target="_blank" rel="noreferrer">
              <Icon component={item.icon} sx={{ fontSize: 48, color: '#21243D' }} />
            </MuiLink>
          </Box>
        ))}
      </Stack>
      <Typography>Copyright ©{new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  )
}
