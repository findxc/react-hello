import { useState, useEffect } from 'react'
import { Card } from 'antd'
import SearchBar from '../SearchBar'

function CardWithSearchBar(props) {
  const { dictKeys, request, children } = props

  const [filter, setFilter] = useState()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()

  const fetchData = (newFilter) => {
    setLoading(true)
    setFilter(newFilter)
    request(newFilter)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData(filter)
  }, [])

  return (
    <Card>
      <SearchBar
        style={{ marginBottom: 16 }}
        dictKeys={dictKeys}
        value={filter}
        onChange={fetchData}
      />
      {children({ loading, data })}
    </Card>
  )
}

export default CardWithSearchBar
