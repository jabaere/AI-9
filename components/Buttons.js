import React from 'react'
import styles from '../styles/Home.module.css'
import {Button} from "./Button"
import { Button2 } from './Button2'

 const Buttons = () => {
  return (
    <div className={styles.homeButtonsContainer}>
     <Button action='generateText' buttonText='generate text'/>
     <Button2 action='generateColor' buttonText='generate color'/>
    </div>
  )
}
export default Buttons