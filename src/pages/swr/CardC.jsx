import { useState, useEffect } from 'react'
import axios from 'axios'
import { Pagination, Card, Tag } from 'antd'
import useSWR, { mutate } from 'swr'

function CardA() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 5 })
  const { data: listData } = useSWR(
    `/api/c/tags?current=${filter.current}&pageSize=${filter.pageSize}`
  )

  useEffect(() => {
    const url = `/api/c/tags?current=${filter.current + 1}&pageSize=${
      filter.pageSize
    }`
    mutate(
      url,
      axios.get(url).then((res) => res.data)
    )
  }, [filter])

  const onPageChange = (current, pageSize) => {
    setFilter({ current, pageSize })
  }

  return (
    <Card title='预加载下一页数据'>
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
