// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'
import moment from 'moment-timezone'

type Data = {
  message: string
  isLogout: boolean
}
export const config = {
  api: {
    bodyParser: false,
  },
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(404).json({ message: 'Method not supported', isLogout: false })
  }

  const cookies = new Cookies(req, res)
  cookies.set('access_token')

  res.status(200).json({ message: 'Logout successfully', isLogout: true })
}
