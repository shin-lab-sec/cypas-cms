import { NextPage } from 'next'
import { ChangeEvent, useCallback, useState } from 'react'

import { useUploadFile } from '@/hooks/useUploadFile'

const Minio: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  const { uploadFile } = useUploadFile()

  const onChangeFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      // file選択していない
      if (!e.target.files || e.target.files.length === 0) return

      const file = e.target.files[0] // 1つでも配列になる
      const fileExt = file.name.split('.').pop()
      const dateString = new Date().toLocaleDateString().replace(/\//g, '')
      const fileName = `${Math.random()}-${dateString}.${fileExt}` // storageに保存する名前
      const contentType = file.type

      const url = await uploadFile({ file, name: fileName, contentType })
      if (url) setImageUrl(url)
    },
    [uploadFile],
  )

  return (
    <>
      <div>minoo</div>
      <input type='file' onChange={onChangeFile} />
      {imageUrl && <img src={imageUrl} alt='' />}
    </>
  )
}

export default Minio