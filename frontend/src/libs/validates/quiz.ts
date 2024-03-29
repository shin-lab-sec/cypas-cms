import { z } from 'zod'

// クイズAPIへのリクエスト型（共通部分）
const quizBaseSchema = z.object({
  question: z.string().nonempty('問題は必須です'),
  explanation: z.string(),
})

// クイズタイプ記述式のリクエスト型
const textSchema = quizBaseSchema.extend({
  type: z.literal('text'),
  choices: z.array(z.string()).max(0, '選択肢は必要ありません'),
  // tupleだと他のtypeと型が変わるので、arrayで定義
  answers: z
    .array(z.string().nonempty('答えは必須です'))
    .min(1, '答えは必須です')
    .max(1, '答えは必須です'),
})

// クイズタイプ選択式のリクエスト型
const radioSchema = quizBaseSchema.extend({
  type: z.literal('radio'),
  choices: z
    .array(z.string().nonempty('空の選択肢があります'))
    .min(1, '選択肢は必須です'), // nonemptyだと型が変わるのでminを使う
  answers: z
    .array(z.string().nonempty('答えは必須ですstring'))
    .min(1, '答えは必須ですmn') // tupleだと他のtypeと型が変わるので、arrayで定義
    .max(1, '答えは必須ですmax'),
})

// クイズタイプ選択式のリクエスト型
const checkboxSchema = quizBaseSchema.extend({
  type: z.literal('checkbox'),
  choices: z
    .array(z.string().nonempty('空の選択肢があります'))
    .min(1, '選択肢は必須です'), // nonemptyだと型が変わるのでminを使う
  answers: z
    .array(z.string().nonempty('空の答えがあります'))
    .min(1, '選択肢は必須です'), // nonemptyだと型が変わるのでminを使う
})

// セクションIDのリクエスト型
const sectionIdSchema = z
  .string({ required_error: 'セクションは必須です' })
  .nonempty('セクションは必須です')

// クイズ作成APIのリクエストのzodスキーマ
export const quizRequestSchema = z.union([
  textSchema.extend({ sectionId: sectionIdSchema }),
  radioSchema.extend({ sectionId: sectionIdSchema }),
  checkboxSchema.extend({ sectionId: sectionIdSchema }),
])

// クイズ更新APIのリクエストのzodスキーマ
export const quizFormRequestSchema = z.union([
  textSchema,
  radioSchema,
  checkboxSchema,
])

// クイズの正誤判定APIのリクエストのzodスキーマ
export const quizAnswersSchema = checkboxSchema.pick({ answers: true })
