import { useCallback } from 'react'
import useSWR, { SWRResponse } from 'swr'

import { fetchApi, HttpError } from '@/utils/api'

// GetメソッドのAPIを叩き、キャッシュするフック
export const useGetApi = <Data = any>(
  url: string,
  props?: {
    params?: Record<string, any>
    headers?: Record<string, string>
    fallbackData?: Data
  },
): SWRResponse<Data, HttpError> => {
  // fetch処理する関数
  const fetcher = useCallback(
    async () => await fetchApi<Data>(url, 'GET', props?.params, props?.headers),
    [props?.headers, props?.params, url],
  )

  // fetchする時キャッシュする
  return useSWR<Data, HttpError>(
    `${url}${JSON.stringify(props?.params)}`,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      fallbackData: props?.fallbackData,
    },
  )
}
