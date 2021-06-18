import { Card } from 'antd'
import regionConfig from 'utils/regionConfig'

function Demo() {
  return (
    <Card title='用 require.context 自动合并多个文件内容'>
      <pre>{JSON.stringify(regionConfig, null, 2)}</pre>
    </Card>
  )
}

export default Demo
