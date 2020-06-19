import React from 'react';
import Imei from './Imei.js'
import AddImei from './AddImei.js'

function SelectImei(props) {

    return (
        <>
            
            <div className="SelectImei">
            <div style={{marginBottom: '15px'}}>Выберите IMEI</div>
                {
                    props.geo.map(imei => <Imei
                        imei={imei}
                        send={props.send}
                        visible={props.visible}
                        geo={props.geo}
                        key={imei.imei}
                    />)
                }
                <AddImei
                    addimei={props.addimei}
                />
            </div>
        </>
    );
}

export default SelectImei;