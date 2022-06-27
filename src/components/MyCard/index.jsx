import React from 'react'

function MyCard(props) {
  const { title, children } = props
  return (
    <div>
      <div style={{ border: '2px solid lightblue' }}>{title}</div>
      <div style={{ border: '2px solid lightgreen' }}>{children}</div>
    </div>
  )
}

export default MyCard
