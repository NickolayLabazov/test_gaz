import pymysql

'''Класс запросов в базу данных'''
class Geolocation():
    host = 'db4free.net'
    password = '12345678'
    user = 'user_of_base'
    base = 'my_test_base'
    cursor = None
    connect = None
    table = 'geo'

    def connect_to_base(self):
        self.connect = pymysql.connect(self.host, self.user, self.password, self.base)
        with self.connect:
            self.cursor = self.connect.cursor()
    
    def set_geo(self, mqtt_geo):        
        new_geo_array = mqtt_geo[3:-2].split(', ')
        imei = new_geo_array[0]
        lotitude = new_geo_array[1]
        longitude = new_geo_array[2]
        with self.connect:               
            self.cursor.execute(f"INSERT INTO {self.table} (imei, lotitude, longitude) VALUES({imei}, {lotitude}, {longitude}) ON DUPLICATE KEY UPDATE lotitude = {lotitude}, longitude = {longitude}")       
            print(self.cursor.fetchall())
    
    def get_geo(self, user_imei):        
        imeis = str(user_imei)[1:-1] 
        if imeis == '':
            return []       
        with self.connect:           
            self.cursor.execute(f"SELECT * FROM {self.table} WHERE imei  IN ({imeis})")
            return self.cursor.fetchall()