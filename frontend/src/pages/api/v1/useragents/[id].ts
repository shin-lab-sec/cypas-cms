import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = String(req.query.id)

  // api/v1/useragents/[id]
  try {
    const userAgent = await prisma.userAgent.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json({ data: userAgent })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}