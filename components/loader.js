import React from 'react';
import ReactLoading from 'react-loading';
 
const Loader = ({ type, color }) => (
    <ReactLoading type={type} color={color} className='loading'/>
);
 
export default Loader;