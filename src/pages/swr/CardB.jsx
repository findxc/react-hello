import { useState } from 'react'
import { Pagination, Card, Tag, Spin } from 'antd'
import useStickySWR from 'utils/useStickySWR'

function CardB() {
  const [filter, setFilter] = useState({ current: 1, pageSize: 5 })
  const { data: listData, isValidating } = useStickySWR(['/api/b/tags', filter])

  const onPageChange = (current, pageSize) => {
    setFilter({ current, pageSize })
  }

  return (
    <Card title='使用封装的 useStickySWR'>
      <Spin spinning={isValidating}>
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
      </Spin>
    </Card>
  )
}

export default CardB
