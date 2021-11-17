import { Fragment } from 'react'
import { Select } from 'antd'

// 字典值对应的名字和下拉项
const dictConfigMap = {
  a: {
    label: '筛选项a',
    options: [
      { label: 'aaa1', value: 'a1' },
      { label: 'aaa2', value: 'a2' },
      { label: 'aaa3', value: 'a3' },
    ],
  },
  b: {
    label: '筛选项b',
    options: [
      { label: 'bbb1', value: 'b1' },
      { label: 'bbb2', value: 'b2' },
    ],
  },
  c: {
    label: '筛选项c',
    options: [
      { label: 'ccc1', value: 'c1' },
      { label: 'ccc2', value: 'c2' },
    ],
  },
}

function SearchBar(props) {
  const { dictKeys, value = {}, onChange, style = {} } = props
  return (
    <div style={style}>
      {dictKeys.map((key) => {
        const { label, options } = dictConfigMap[key]
        return (
          <Fragment key={key}>
            {label}：
            <Select
              style={{ width: 120, marginRight: 12 }}
              options={options}
              value={value[key]}
              onChange={(v) => onChange({ ...value, [key]: v })}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

export default SearchBar
