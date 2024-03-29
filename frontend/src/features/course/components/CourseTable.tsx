import { Button, Flex } from '@mantine/core'
import { MRT_ColumnDef, MantineReactTable } from 'mantine-react-table'
import Link from 'next/link'
import { FC, useMemo } from 'react'

import { ConfirmButton } from '@/components/ConfirmButton'
import { ExportJsonButton } from '@/components/ExportJsonButton'
import { CourseWithSections } from '@/types'
import { convertToJapanTime } from '@/utils/convertToJapanTime'

import { UpdateCourseButton } from './UpdateCourseButton'
import { CourseRequest } from '../types'

type Props = {
  courses: CourseWithSections[]
  updateCourse: (id: string, params: CourseRequest) => void
  deleteCourse: (id: string) => void
}

// コーステーブル
export const CourseTable: FC<Props> = ({
  courses,
  updateCourse,
  deleteCourse,
}) => {
  // テーブルのカラム情報
  const columns = useMemo<MRT_ColumnDef<CourseWithSections>[]>(
    () => [
      {
        accessorKey: 'name',
        header: '名前',
        Cell: ({ row: { original: course } }) => (
          <div className='min-w-200px max-w-400px break-words'>
            <Link href={`/courses/${course.id}`}>{course.name}</Link>
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: '詳細',
        Cell: ({ cell }) => (
          <div className='min-w-300px max-w-600px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        header: 'セクション数',
        maxSize: 0,
        Cell: ({
          row: {
            original: { sections },
          },
        }) => (
          <div className='max-w-300px break-words'>{sections?.length ?? 0}</div>
        ),
      },
      {
        accessorKey: 'level',
        header: '難易度',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'imageUrl',
        header: '画像',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
            <img src={String(cell.getValue())} alt='' />
          </div>
        ),
      },
      {
        accessorKey: 'author',
        header: '製作者',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'organization',
        header: '所属',
        maxSize: 0,
        Cell: ({ cell }) => (
          <div className='max-w-300px break-words'>
            {String(cell.getValue())}
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: '作成日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      {
        accessorKey: 'updatedAt',
        header: '最終更新日',
        maxSize: 0,
        Cell: ({ cell }) => convertToJapanTime(cell.getValue() as string),
      },
      // 編集・削除ボタンをCellに置く
      {
        header: ' ',
        // 操作出来なくする
        enableColumnActions: false,
        enableColumnDragging: false,
        enableSorting: false,
        maxSize: 0,
        Cell: ({ row: { original: course } }) => {
          const courseFormRequest: CourseRequest = {
            name: course.name,
            level: course.level as 1 | 2 | 3,
            description: course.description ?? '',
            imageUrl: course.imageUrl ?? '',
            author: course.author,
            organization: course.organization,
          }

          return (
            <Flex align='center' gap='sm' className='min-w-250px'>
              <ExportJsonButton data={course} fileName={course.name} />
              <UpdateCourseButton
                onSubmit={v => updateCourse(course.id, v)}
                initValue={courseFormRequest}
              />
              <ConfirmButton
                confirmMessage={`コース: "${course.name}" を削除しますか？`}
                onConfirm={() => deleteCourse(course.id)}
              >
                <Button component='span' color='red'>
                  削除
                </Button>
              </ConfirmButton>
            </Flex>
          )
        },
      },
    ],
    [deleteCourse, updateCourse],
  )

  return (
    <MantineReactTable columns={columns} data={courses} enableColumnOrdering />
  )
}
