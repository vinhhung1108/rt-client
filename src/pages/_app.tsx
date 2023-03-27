import axiosClient from '@/api-client/axios-client'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models'
// import '@/styles/globals.css'
import moment from 'moment-timezone'
import 'moment/locale/en-gb'
import { SWRConfig } from 'swr'

import { Auth, Header, NonAuth } from '@/components/common'
import { createEmotionCache, theme } from '@/utils'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  moment.tz.setDefault('Asia/Ho_Chi_Minh')
  moment.locale('en-bg')
  const Layout = Component.Layout ?? EmptyLayout
  const isPrivate = Component.isPrivate
  const requiredRoles = Component.requiredRoles
  const AuthApp = isPrivate ? Auth : NonAuth

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <Header />
          <AuthApp isPrivate={isPrivate} requiredRoles={requiredRoles}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthApp>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  )
}
