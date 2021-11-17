import ECharts from 'echarts-for-react'
import CardWithSearchBar from './CardWithSearchBar'
import parseOption from './parseOption'
import { getStatWeek } from './service'
import styles from './index.module.less'

function Stat() {
  return (
    <div>
      <CardWithSearchBar dictKeys={['a', 'b']} request={getStatWeek}>
        {({ loading, data }) => {
          return (
            <div className={styles.charts}>
              <ECharts
                style={{ height: 400 }}
                showLoading={loading}
                option={parseOption(data?.data1)}
              />
              <ECharts
                style={{ height: 400 }}
                showLoading={loading}
                option={parseOption(data?.data2)}
              />
            </div>
          )
        }}
      </CardWithSearchBar>
    </div>
  )
}

export default Stat
