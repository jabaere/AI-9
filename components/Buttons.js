import React from 'react'
import styles from '../styles/Home.module.css'
import {Button} from "./button"
import { Button2 } from './button2'

 const Buttons = () => {
  return (
    <div className={styles.homeButtonsContainer}>
     <Button action='generateText' buttonText='generate text'/>
     <Button2 action='generateColor' buttonText='generate color'/>
    </div>
  )
}
export default Buttons