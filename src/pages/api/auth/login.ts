// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment-timezone'

type Data = {
  message: string
}
export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Method not supported' })
  }
  return new Promise((resolve) => {
    //don't send cookie to API server
    //   req.cookies = {}
    req.headers.cookie = ''

    proxy.on('proxyReq', function (proxyReq, req, res, options) {
      proxyReq.path = proxyReq.path?.replace('/api', '')
    })

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ''
      proxyRes.on('data', function (chunk) {
        body += chunk
      })
      proxyRes.on('end', function () {
        try {
          const isSuccess =
            proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode < 300
          if (!isSuccess) {
            ;(res as NextApiResponse).status(proxyRes.statusCode || 500).json(body)
            return resolve(true)
          }
          const { accessToken, expiredAt } = JSON.parse(body)
          //convert token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' })
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(moment.unix(expiredAt).format('YYYY-MM-DD HH:mm:ss')),
          })
          ;(res as NextApiResponse)
            .status(200)
            .json({ expires: moment.unix(expiredAt).format('YYYY-MM-DD HH:mm:ss') })
        } catch (error) {
          ;(res as NextApiResponse).status(500).json({ message: 'Somthing went wrong' })
        }
        return resolve(true)
      })
    }

    proxy.once('proxyRes', handleLoginResponse)

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    })
  })
}
