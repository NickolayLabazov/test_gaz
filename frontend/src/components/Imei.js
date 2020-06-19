import React from 'react';
import { Radio } from 'semantic-ui-react'

function Imei(props) {   
  const handleClick =() => {
    props.visible(props.imei.imei)    
  }
  
  return (     
       <Radio style={{marginBottom: '15px'}} onClick = {() => handleClick()} checked={props.imei.visible} label={props.imei.imei} />     
  );
}

export default Imei;