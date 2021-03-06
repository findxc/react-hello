import { Divider } from 'antd'
import img1 from './images/1.gif'
import img2 from './images/2.png'
import img3 from './images/3.png'
import img4 from './images/4.jpeg'

function Webp() {
  return (
    <div>
      <img alt='demo' src={img1} />
      <img alt='demo' src={img2} />
      <img alt='demo' src={img3} />
      <img alt='demo' src={img4} />
      <Divider />
      <img alt='demo' src='/images/1.gif' />
      <img alt='demo' src='/images/2.png' />
      <img alt='demo' src='/images/3.png' />
      <img alt='demo' src='/images/4.jpeg' />
    </div>
  )
}

export default Webp
