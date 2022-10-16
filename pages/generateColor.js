import React,{useEffect} from 'react'
import { Form } from '../components/form'

 const GenerateColor = () => {
  return (
    <Form buttonText='generate color' action='api/generateColor'/>
   )
}

export default GenerateColor