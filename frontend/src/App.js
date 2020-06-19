import React, { useState, useEffect } from 'react';
import './App.css';
import SelectImei from './components/SelectImei.js'
import Mark from './components/Mark.js'
import { YMaps, Map, ZoomControl, FullscreenControl } from 'react-yandex-maps';

function App(props) {

  const [geo, setGeo] = useState( // Хранение состояния тс
    [
      {
        imei: '356060081186999',
        visible: false,
        coord: null,
      },
      {
        imei: '232323',
        visible: false,
        coord: null,
      }

    ])

  const addimei = (imei) => { // Добавление нового тс
    const newimei = {
      imei: imei,
      visible: false,
      coord: null,
    }
    if (geo.filter(item => item.imei === imei).length > 0 || imei === '') {
      return
    }
    setGeo(prevGeo => prevGeo.concat(newimei))
  }

  const visible = (imei) => {  //Видимость тс на карте
    let index = geo.indexOf(geo.filter(item => item.imei === imei)[0])
    let newImei = {
      imei: geo[index].imei,
      visible: !geo[index].visible,
      coord: geo[index].coord
    }
    setGeo(prevGeo => prevGeo.slice(0, index).concat(newImei).concat(prevGeo.slice(index + 1)))
  }

  const newCoord = (coord) => {    // Установка новых координат, пришедших с сервера
    let index = geo.indexOf(geo.filter(item => item.imei === coord[0])[0])
    let newImei = {
      imei: geo[index].imei,
      visible: geo[index].visible,
      coord: [Number(coord[1]) / 3600000, Number(coord[2]) / 3600000]
    }
    if (geo[index].coord !== null && (geo[index].coord[0] === coord[1] / 3600000 && geo[index].coord[1] === coord[2] / 3600000)) {
      return
    }
    setGeo(prevGeo => prevGeo.slice(0, index).concat(newImei).concat(prevGeo.slice(index + 1)))
  }

  const send = (message) => {
    ws.send(message)
  }

  useEffect(() => { //  Отправка на сервер списка imei в случае его обновления
    try {
      let client_imei = geo.map(imei => imei.visible ? imei.imei : null).filter(item => item !== null)
      ws.send(JSON.stringify(client_imei))
    }
    catch (e) { }
  }, [geo]);

  const mapState = {
    center: [135581984 / 3600000, 200046496 / 3600000],
    zoom: 3,
  };

  const ws = props.ws;
  ws.onmessage = evt => {
    const messageJson = evt.data
    const message = JSON.parse(messageJson)
    for (let imei of message) {
      newCoord(imei)
    }
  }

  return (
    <>
      <div className="App">
        <SelectImei
          geo={geo}
          addimei={addimei}
          visible={visible}
          newCoord={newCoord}
          send={send}
        />
        <YMaps>
          <Map
            defaultState={mapState}
            className='map'
          >
            {geo.map(imei => <Mark imei={imei} key={imei.imei} />)}
            <ZoomControl
              options={{
                size: 'small'
              }}
            />
            <FullscreenControl />
          </Map>
        </YMaps>
      </div>
    </>
  );
}

export default App;