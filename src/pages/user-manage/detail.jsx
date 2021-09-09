import withLeavePrompt from 'utils/withLeavePrompt'
import FormCard from './components/FormCard'

function Detail(props) {
  const { addEditing, removeEditing } = props
  return (
    <div>
      {['一一一', '二二二', '三三三', '四四四', '五五五', '六六六'].map(
        (title) => (
          <FormCard
            key={title}
            style={{ margin: '24px 0' }}
            title={title}
            addEditing={addEditing}
            removeEditing={removeEditing}
          />
        )
      )}
    </div>
  )
}

export default withLeavePrompt(Detail, 24)
