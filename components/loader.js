import React from 'react';
import ReactLoading from 'react-loading';
 
const Loader = ({ type, color,width,height }) => (
    <ReactLoading type={type} color={color} className='loading' width={width} height={height}/>
);
 
export default Loader;