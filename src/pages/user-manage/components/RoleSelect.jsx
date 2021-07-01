import React, { useMemo } from 'react'
import { Select } from 'antd'
import useQuery from 'utils/useQuery'

function RoleSelect(props) {
  const { data } = useQuery('/api/roles/all')

  const roleOptions = useMemo(() => {
    return (data || []).map((item) => {
      const { id, name } = item
      return { value: id, label: name }
    })
  }, [data])

  return <Select options={roleOptions} {...props} />
}

export default RoleSelect
