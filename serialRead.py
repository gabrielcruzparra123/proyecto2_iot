import serial
import time
import paho.mqtt.client as mqtt
import json

ser = serial.Serial('COM3', 9600, timeout=0)

class MqttSubscriber:
	def readSerial():
		while 1:
			try:
				print (ser.readline())
				time.sleep(1)
			except ser.SerialTimeoutException:
				print('Data could not be read')
				time.sleep(1)

	def publishMqtt():
		broker_address="localhost"
		client = mqtt.Client("mqttClient")
		indicador ="{"
		posicion = 0
		while 1:
			try:
				cadena = ser.readline().decode('ascii')
				print("Original: ")
				print(cadena)

				posicion = 	cadena.find(indicador,0)
				
				if posicion >= 0 :
					try:
						jsonObject =json.loads(cadena)
						print("Objeto JSON: ")
						print(jsonObject)
						topic = jsonObject["topic"]
						if topic == "temperature":
							client.connect(broker_address)
							client.publish("temperature",cadena)
						elif topic == "distance":
							client.connect(broker_address)
							client.publish("distance",cadena)	
						elif topic == "light":	
							client.connect(broker_address)
							client.publish("light",cadena)		
						elif topic == "weight":
							client.connect(broker_address)
							client.publish("weight",cadena)		
					except:
						None	

				
				time.sleep(1)
				
			except ser.SerialTimeoutException:
				print('Data could not be read')
				time.sleep(1)

MqttSubscriber.publishMqtt()