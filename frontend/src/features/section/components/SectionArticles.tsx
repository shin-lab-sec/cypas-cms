import { Button, Flex, Pagination } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { FC, useMemo, useState } from 'react'

import {
  useCreateArticle,
  useDeleteArticle,
  useUpdateArticle,
} from '@/features/article'
import { ArticleEditor } from '@/features/article/ArticleEditor'
import { SectionWithRelation } from '@/types'

type Props = {
  section: SectionWithRelation
}

export const SectionArticles: FC<Props> = ({ section }) => {
  const { articles } = section
  const [selectedPage, setSelectedPage] = useState(1) // 表示中のページ番号
  // 表示中の記事
  const selectedArticle = useMemo(
    () => articles[selectedPage - 1],
    [articles, selectedPage],
  )

  // 作成、更新、削除関数
  const { createArticle } = useCreateArticle(section.id)
  const { updateArticle } = useUpdateArticle(section.id)
  const { deleteArticle } = useDeleteArticle(section.id)

  // 記事がないなら作成ボタンを表示
  if (!articles.length) {
    return (
      <Flex justify='center' className='mt-200px'>
        <Button onClick={createArticle}>記事を作成</Button>
      </Flex>
    )
  }

  return (
    <div>
      {selectedArticle && (
        <div>
          <Flex gap='sm' justify='end' align='center'>
            <Flex>
              <Pagination
                value={selectedPage}
                onChange={setSelectedPage}
                total={articles.length}
              />
            </Flex>

            <IconPlus
              size='1.5rem'
              onClick={createArticle}
              className='cursor-pointer'
            />
          </Flex>

          {/* 記事エディタ */}
          <ArticleEditor
            key={selectedArticle.id}
            body={selectedArticle.body}
            onSave={body => updateArticle(selectedArticle.id, body)}
            onDelete={() => {
              deleteArticle(selectedArticle.id)
              setSelectedPage(1)
            }}
          />
        </div>
      )}
    </div>
  )
}
