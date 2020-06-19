import React from 'react';
import { Placemark } from 'react-yandex-maps';

function Mark(props) {
  return (
    <>
      {
        props.imei.visible ?
          <Placemark
            geometry={props.imei.coord}
            options={{ preset: 'islands#greenCircleDotIcon' }}
          />
          : null
      }
    </>
  );
}

export default Mark;