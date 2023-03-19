import { EmotionCache } from '@emotion/cache'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (
    props: LayoutProps
  ) => ReactElement /** Replace ReactNode (null, number, undefine,...) */
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}
