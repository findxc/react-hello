import { useState } from 'react'
import { Pagination, Card, Tag } from 'antd'
import useSWR from 'swr'

function CardA() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 5 })
  const { data: listData } = useSWR(['/api/a/tags', filter])

  const onPageChange = (current, pageSize) => {
    setFilter({ current, pageSize })
  }

  return (
    <Card title='直接使用 useSWR'>
      <div>
        {listData?.list?.map((item) => {
          const { id, name, color } = item
          return (
            <Tag key={id} color={color}>
              {name}
            </Tag>
          )
        })}
      </div>
      <br />
      <Pagination
        {...filter}
        total={listData?.total}
        showSizeChanger
        onChange={onPageChange}
        onShowSizeChange={onPageChange}
      />
    </Card>
  )
}

export default CardA
