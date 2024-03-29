import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Flex, Stack, TextInput } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useFormErrorHandling } from '@/hooks/useFormErrorHandling'
import { sectionFormRequestSchema } from '@/libs/validates'

import { SectionFormRequest } from '../../types'

type Props = {
  onSubmit: (params: SectionFormRequest) => void
  submitButtonName?: string
  initValue?: SectionFormRequest
  onDirty: () => void
}

// セクションタイプ解説記事のフォーム
export const SectionArticleForm: FC<Props> = ({
  onSubmit: onSubmitProps,
  submitButtonName,
  initValue,
  onDirty,
}) => {
  // フォームの状態を管理する
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SectionFormRequest>({
    resolver: zodResolver(sectionFormRequestSchema),
    criteriaMode: 'all',
    defaultValues: { ...initValue, type: 'article' },
  })

  // 送信関数をラップして、エラーハンドリングを行う
  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<SectionFormRequest>(onSubmitProps)

  // useEffectを使わないと、レンダリング中にsetStateを呼ぶことになりWarningが出る
  useEffect(() => {
    if (isDirty) onDirty()
  }, [isDirty, onDirty])

  return (
    <>
      {errorMessage && (
        <Alert
          icon={<IconAlertCircle size='1rem' />}
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
        <p className='text-center'>解説記事</p>
        <Stack>
          <TextInput
            label='セクション名'
            error={errors.name?.message}
            placeholder='ブルートフォース攻撃とは何か'
            withAsterisk
            {...register('name')}
          />

          <Flex justify='end'>
            <Button type='submit'>{submitButtonName}</Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}
