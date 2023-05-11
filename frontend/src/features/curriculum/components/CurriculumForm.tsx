import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Stack, TextInput, Textarea } from '@mantine/core'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircle } from 'tabler-icons-react'
import { z } from 'zod'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { curriculumSchema } from '@/libs/validates'

export type CurriculumFormRequest = z.infer<typeof curriculumSchema>

type Props = {
  onSubmit: (params: CurriculumFormRequest) => void
  submitButtonName?: string
  initValue?: CurriculumFormRequest
  onDirty: () => void
}

export const CurriculumForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CurriculumFormRequest>({
    resolver: zodResolver(curriculumSchema),
    criteriaMode: 'all',
    defaultValues: initValue,
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<CurriculumFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  return (
    <>
      {errorMessage && (
        <Alert
          icon={<AlertCircle size='1rem' />}
          title='サーバーでエラーが発生しました'
          color='red'
          onClose={clearErrorMessage}
          mb='sm'
          classNames={{ message: 'mt-0' }}
          withCloseButton
        >
          {errorMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label='カリキュラム名'
            error={errors.name?.message}
            placeholder='ブルートフォース攻撃とは何か'
            withAsterisk
            {...register('name')}
          />
          <TextInput
            label='GitHubのURL'
            placeholder='https://github.com/example/curriculum1'
            error={errors.gitHubUrl?.message}
            {...register('gitHubUrl')}
          />
          <TextInput
            label='画像のURL'
            placeholder='https://example.image'
            error={errors.imageUrl?.message}
            {...register('imageUrl')}
          />
          <TextInput
            label='記事のURL'
            placeholder='https://example.article'
            error={errors.articleUrl?.message}
            {...register('articleUrl')}
          />
          <Textarea
            label='コース詳細'
            autosize
            placeholder='このカリキュラムでは、ブルートフォース攻撃とは何かを学びます。ブルートフォース攻撃は、自動化ツールを使って、パスワードを推測する攻撃手法です。このカリキュラムでは、ブルートフォース攻撃の基本的な概念や、実際にどのように攻撃が行われるかを学ぶことができます。'
            {...register('description')}
          />

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
