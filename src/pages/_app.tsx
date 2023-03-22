import axiosClient from '@/api-client/axios-client'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
// import '@/styles/globals.css'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'
import { SWRConfig } from 'swr'

import { Auth } from '@/components/common'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  moment.tz.setDefault('Asia/Ho_Chi_Minh')
  moment.locale('en-bg')
  const Layout = Component.Layout ?? EmptyLayout
  const isPrivate = Component.isPrivate
  const requiredRoles = Component.requiredRoles

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <Layout>
            <Auth isPrivate={isPrivate} requiredRoles={requiredRoles}>
              <Component {...pageProps} />
            </Auth>
          </Layout>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
