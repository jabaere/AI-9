import React from "react";
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { Suspense, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Robots } from "../three/Robots";
import { transition } from "../three/settings";
import useMeasure from "react-use-measure";

export const Button = ({action, buttonText}) => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  console.log(action)
  return (
    
    
      <MotionConfig transition={transition}>
      <Link href={`/${action}`}>
      <motion.button
        ref={ref}
        initial={{
          marginBottom:'160px',
          width:'250px',
        }}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        id={action}
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.2 },
          press: { scale: 1.4 }
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          className={styles.robot}
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
        >
     
          <div className={styles.container}>
            <Suspense fallback={null}>
              <Robots
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                positionX = {2}
                positionY = {-0.5}
                pozitionZ = {0}
                path='./model2/scene.gltf'
              />
            </Suspense>
          </div>
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
          className={styles.label}
        >
         
             {buttonText} 
        
        </motion.div>
      </motion.button>
      </Link>
    </MotionConfig>
      
    
  );
};
