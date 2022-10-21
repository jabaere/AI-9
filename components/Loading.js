import { Html, useProgress } from '@react-three/drei'
import Loader from "./loader"

export default function Loading({style}) {
  const { progress } = useProgress()
  return <Html center style={style}>
    <Loader type="cylon" color="#fde002"/>
    <div className='progress'>{Math.round(progress)} % loaded</div>
    </Html>
}

