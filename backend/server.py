from multiprocessing import Process
from mqtt import Mqtt
from websocket import Websocket

mqtt = Mqtt()
ws = Websocket()

if __name__ == '__main__': 
    
    '''Процесс с MQTT-клиентом'''  
    p1 = Process(target = mqtt.start)

    '''Процесс с Websocket''' 
    p2 = Process(target = ws.start)   
    p1.start()
    p2.start()
    p1.join()
    p2.join()