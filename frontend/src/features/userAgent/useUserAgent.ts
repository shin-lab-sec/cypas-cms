import { UserAgent } from '@prisma/client'
import { useCallback } from 'react'

import { useGetApi } from '@/hooks/useApi'
import { postApi, putApi, deleteApi } from '@/utils/api'

import { UserAgentFormRequest } from './types'

// ユーザーエージェント作成フック
export const useCreateUserAgent = () => {
  // ユーザーエージェント一覧、キャッシュ更新関数
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  // ユーザーエージェント作成関数
  const createUserAgent = useCallback(
    async (params: UserAgentFormRequest) => {
      try {
        // ユーザーエージェントを作成
        const newUserAgent = await postApi<UserAgent>('/useragents', params)
        console.log('追加に成功', newUserAgent)

        if (!userAgents) return

        // 再度データを取得しキャッシュを更新する
        mutateUserAgents([...userAgents, newUserAgent])
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [userAgents, mutateUserAgents],
  )

  return { createUserAgent }
}

// ユーザーエージェント更新のフック
export const useUpdateUserAgent = () => {
  // ユーザーエージェント一覧、キャッシュ更新関数
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  //
  const updateUserAgent = useCallback(
    async (id: string, params: UserAgentFormRequest) => {
      try {
        // ユーザーエージェント更新
        const updatedUserAgent = await putApi<UserAgent>(
          `/useragents/${id}`,
          params,
        )
        console.log('更新に成功', updatedUserAgent)

        if (!userAgents) return
        // 対象のidだけ更新されたユーザーエージェントに置き換える
        const updatedUserAgents = userAgents.map(v =>
          v.id === id ? updatedUserAgent : v,
        )
        // 再度データを取得しキャッシュを更新する
        mutateUserAgents(updatedUserAgents)
      } catch (e) {
        // エラー処理
        console.error(e)
        if (e instanceof Error) {
          throw e.message
        }
        throw JSON.stringify(e)
      }
    },
    [userAgents, mutateUserAgents],
  )
  return { updateUserAgent }
}

// ユーザーエージェント削除のフック
export const useDeleteUserAgent = () => {
  // ユーザーエージェント一覧、キャッシュ更新関数
  const { data: userAgents, mutate: mutateUserAgents } =
    useGetApi<UserAgent[]>('/useragents')

  // ユーザーエージェント削除関数
  const deleteUserAgent = useCallback(
    async (id: string) => {
      try {
        // ユーザーエージェント削除
        await deleteApi(`/useragents/${id}`)
        console.log('削除に成功')

        if (!userAgents) return
        // ユーザーエージェント一覧から対象のidのユーザーエージェントを除く
        const filteredUserAgents = userAgents.filter(v => v.id !== id)
        // 再度データを取得しキャッシュを更新する
        mutateUserAgents(filteredUserAgents)
      } catch (e) {
        console.error(e)
      }
    },
    [userAgents, mutateUserAgents],
  )

  return { deleteUserAgent }
}
