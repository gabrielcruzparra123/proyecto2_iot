import boto3
import json
import datetime
import time
import decimal

def lambda_handler(event, context):
    
    operation = event['httpMethod']
    dynamodb = boto3.resource('dynamodb')
    
    if operation == 'POST':
  
        parameters = event['body']
        table = dynamodb.Table('ArduinoData')
        d = datetime.datetime.now()
        table.put_item(
            Item={
                'ID': int(time.mktime(d.timetuple())),
                'channel': parameters["channel"],
                'topic': parameters["topic"],
                'value': str(parameters["value"]),
                'energy': str(parameters["energy"]),
                'date': str(d)
           }
        )
     
        if float(parameters["value"]) >= 50.0 :   
           send_email(parameters["topic"])
     
        return {
            'statusCode': '200',
            'body': json.dumps('Persistido'),
            'headers': {
                'Content-Type': 'application/json',
            },
        }
    
     
def send_email(device_name):
    client = boto3.client('ses')
    response = client.send_email(
	    Source="aoshishinomorig@gmail.com",
	    Destination={
		    'ToAddresses': [
			"aoshishinomorig@gmail.com",
		    ],
	    },
	    Message={
		    'Subject': {
			    'Data': "Value overhead - Device: "+ device_name,
			    'Charset': 'utf8'
		    },
		    'Body': {
			'Text': {
				'Data': "Value overhead. Please check if it is the desired behavior",
				'Charset': 'utf8'
			    }
		    }
	    },
    )
    
