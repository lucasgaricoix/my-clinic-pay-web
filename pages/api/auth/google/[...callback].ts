import { GoogleCredential } from '@/types/auth/google'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    if (!req.body) {
      res.status(403).json({ message: 'Google credential not found' })
    }

    const credential = jwt.decode(req.body.credential, {
      json: true,
    }) as GoogleCredential

    if (!credential?.email_verified) {
      res.status(401).json({ message: 'Email not verified' })
    }

    const params = `id=${credential.sub}&name=${credential.name}&email=${credential.email}&picture=${credential.picture}&verified=${credential.email_verified}`
    res.redirect(`/auth/google/callback?${params}`)
  }
}
