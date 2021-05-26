import axios from 'axios'
import { useState, useEffect } from 'react'

function useQuery(url, params) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(url, { params })
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [url, params])

  return { loading, data }
}

export default useQuery
