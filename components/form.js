import React,{useEffect,useState,Suspense,useRef} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from "../styles/Home.module.css";
import { Canvas } from '@react-three/fiber';
import {RobotForForm} from "../three/RobotForForm"
export const Form = ({action,buttonText}) => {
  const boxRef = useRef();

    const router = useRouter()
    const [data,setData] = useState([])
    const [input,setInput] = useState('')
    const [colorRes,setColorRes] = useState('')
    const [colorSimple,setColorSimple] = useState('')
    useEffect(() => {
      console.log(data)
      },[colorRes,colorSimple]);

  
    async function getData(e) {
   
      e.preventDefault()
      // 👇️ redirect
      console.log('dasda')
      console.log(action)
    
      try {
        const response = await axios.post(`http://localhost:3000/${action}`,{input: input});
           console.log(response.data.choices)
           setData(response.data.choices)
           console.log(response.data.choices[0].text)
      
        if(action ==='api/generateColor'){
          const filterText = response.data.choices[0].text.replace(/[\n\r]+/g, '')
          const color = filterText.match(/[^:]*$/g).toString().replace(/[,]/g,'');
          console.log(color)
          console.log(filterText)
          setColorRes(color)
        }
        
          // const colorRes = color.match(/#\w+/g).toString()
           //const colorSimple = color.match(/(?<=color:).*/g).toString()
       
        } catch (error) {
        console.error(error);
       }
    }
      
  return (
    <div id={styles.container} style={{backgroundColor:action==='api/generateColor' ? colorRes : 'inherit' }}>
             <Canvas
        shadows={true}
        dpr={[3, 2]}
        shadowMap
        camera={{ position: [4.5, 2, 5], fov: 90 }}
        style={{height:'300px',position:'relative'}}
      
       >
        <directionalLight
         intensity={0.5}
         castShadow  
         shadow-mapSize-height={512}
         shadow-mapSize-width={512}
/>
        <Suspense fallback={null}>
          <RobotForForm
            modelPath="./model3form/scene.gltf"
            positionX={0}
            positionY={4.5}
            positionZ={0}
            scale={6}
           />
        </Suspense>
       </Canvas>
     {action === 'api/generateColor' ?   
      <code className={styles.code}>Tranform your Mood to a color/describe your thouts an take color!</code>
      :
      <code className={styles.code}>start a story and I'll finish it/ or Just ask me something!</code>
     }
    <form onSubmit={(e)=>getData(e)} className={styles.form}>
      <input type='text' name='usertext' onChange={(e)=> setInput(e.currentTarget.value)}/>
      <button>{buttonText}</button>
    </form>
       {data && data.map((a,index)=><h2 id='result' key={index}>{a.text}</h2>)}

       <button className={styles.backButton} onClick={() => router.back()}>Back</button>
  </div>
  )
}
