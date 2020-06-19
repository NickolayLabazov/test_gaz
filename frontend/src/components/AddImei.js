import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react'
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/input.min.css';

function AddImei(props) {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event) => {
    event.persist()
    setInputValue(() => event.target.value)
  }

  const submit = (imei) => {
    props.addimei(imei)
    setInputValue(() => '')
  }

  return (
    <>
      <div style={{ marginBottom: '15px' }}>Добавить новый IMEI</div>
      <div style={{ display: 'flex' }}>
        <Input value={inputValue} onChange={handleChange} placeholder='Введите IMEI' />
        <Button size='mini' color='blue' onClick={() => submit(inputValue)}>Добавить</Button>
      </div>
    </>
  );
}

export default AddImei;