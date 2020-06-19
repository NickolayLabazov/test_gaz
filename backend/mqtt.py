import paho.mqtt.client as mqtt
import ssl
from multiprocessing import Process
from geolocation import Geolocation


geolocation = Geolocation()
geolocation.connect_to_base()

'''Класс MQTT-клиента'''
class Mqtt():

    host = "mqtt.sisdev.site"
    port = 8883
    timeout = 20

    def on_connect(self, client, userdata, flags, rc):
        print("Connected with result code "+str(rc))    
        client.subscribe("test_task")

    def on_disconnect(self, client, userdata, rc):
        print("disconnected with rtn code [%d]"% (rc))

    def on_message(self, client, userdata, msg):
        print(msg.topic+" "+str(msg.payload))  
        geolocation.set_geo(str(msg.payload))        

    def start(self):       
        
        geolocation.set_geo(str(b"('356060081186999', 135581984, 200046496, 218)"))
        geolocation.set_geo(str(b"('232323', 177439328, 192671600, 218)"))
        
        client = mqtt.Client()
        client.on_connect = self.on_connect
        client.on_message = self.on_message
        client.on_disconnect = self.on_disconnect
        client.username_pw_set('mqtt', password='mqtt_user')
        client.tls_set("ca.crt", tls_version=ssl.PROTOCOL_TLSv1_2)        
        client.connect(self.host, self.port, self.timeout)
        client.loop_forever() 