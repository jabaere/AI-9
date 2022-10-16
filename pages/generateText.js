import React from 'react'
import { Form } from '../components/form'

 const GenerateText = () => {
  return (
    <Form buttonText='generate text' action='api/generateText'/>
  )
}
export default GenerateText