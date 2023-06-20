import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // api/v1/sections
  try {
    const sections = await prisma.section.findMany({
      include: {
        userAgent: true,
        articles: { orderBy: { createdAt: 'asc' } },
        quizzes: { orderBy: { createdAt: 'asc' } },
      },
      orderBy: { createdAt: 'asc' },
    })
    res.status(200).json({ data: sections })
  } catch (err) {
    res.status(400).json({ data: err })
  }
}