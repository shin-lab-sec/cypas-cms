import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

const globalAny: any = global

// prismaの設定
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient()
  }
  prisma = globalAny.prisma
}

export default prisma
