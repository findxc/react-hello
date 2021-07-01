import React from 'react'
import { TreeSelect } from 'antd'
import useQuery from 'utils/useQuery'

function IndustrySelect(props) {
  const { data: allIndustrys } = useQuery('/api/industrys')

  const renderTreeNode = ({ id, name, children }) => (
    <TreeSelect.TreeNode key={id} value={id} title={name}>
      {children?.map((item) => renderTreeNode(item))}
    </TreeSelect.TreeNode>
  )

  return (
    <TreeSelect {...props}>
      {(allIndustrys || []).map(renderTreeNode)}
    </TreeSelect>
  )
}

export default IndustrySelect
