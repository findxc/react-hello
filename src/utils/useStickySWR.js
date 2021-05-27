import { useRef } from 'react'
import useSWR from 'swr'

function useStickySWR(...args) {
  const val = useRef()

  const { data, isValidating, error, ...rest } = useSWR(...args)

  if (data !== undefined) {
    val.current = data
  }

  return {
    ...rest,
    isValidating,
    error,
    data: val.current,
  }
}

export default useStickySWR
