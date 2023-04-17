import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, body } = req
  const id = String(req.query.id)

  switch (method) {
    // courses/1
    case 'GET':
      try {
        const courses = await prisma.course.findUnique({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: courses, method: method })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'PUT':
      try {
        const course = await prisma.course.update({
          where: {
            id: id,
          },
          // 大丈夫？
          data: {
            name: body.name,
            url: body.url,
            article: body.article,
            imageUrl: body.imageUrl,
            description: body.description,
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    // courses/1
    case 'DELETE':
      try {
        const course = await prisma.course.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ data: course })
      } catch (err) {
        res.status(400).json({ data: err })
      }
      break

    default:
      res.status(405).end()
      break
  }
}