import asyncio
import websockets
from geolocation import Geolocation
import json

geolocation = Geolocation()
geolocation.connect_to_base()

'''Класс Websocket'''
class Websocket():

    timeout = 1    
    client_imei = []
    USERS = set()
    host = "127.0.0.1"
    port = 3000

    async def addUser(self, websocket):
        self.USERS.add(websocket)        

    async def removeUser(self,websocket):
        self.USERS.remove(websocket)    

    def start(self):       
        start_ws = websockets.serve(self.main, self.host, self.port)             
        asyncio.get_event_loop().run_until_complete(start_ws)
        asyncio.get_event_loop().run_forever()    

    '''Опрос базы данных и отправка клиенту локации тс с запрошенными imei с интервалом timeout'''
    async def worker(self, websocket, path):        
        while True:                                                        
            await websocket.send(json.dumps(geolocation.get_geo(self.client_imei)))           
            await asyncio.sleep(self.timeout)  

    '''Прослушивание запросов от клиента'''
    async def recv(self, websocket, path):            
        try:
            client_imei = await websocket.recv()            
            self.client_imei = json.loads(client_imei)
            await self.recv(websocket, path)
        except:            
            await self.removeUser(websocket)

    '''Запуск параллельной работы прослушивания ws и регулярной отправки сообщений'''
    async def main(self, websocket, path):
        await self.addUser(websocket)        
        task1 = asyncio.get_event_loop().create_task(self.worker(websocket, path))
        task2 = asyncio.get_event_loop().create_task(self.recv(websocket, path))                    
        await task1
        await task2        