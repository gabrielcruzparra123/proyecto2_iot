import json
import boto3
import decimal
import time
from boto3.dynamodb.conditions import Key, Attr

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    
    # TODO implement
    operation = event['httpMethod']
    if operation == 'GET':
            
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('ArduinoData')
        #topic = event['topic']
        
        response = table.scan(
        #        FilterExpression=Attr('topic').eq(topic)  
            )
        
        items = []    
        items =  response['Items']
            
        return {
            'statusCode': '200',
            'body': json.dumps(items, sort_keys=True, default=None, cls=DecimalEncoder),
            'headers': {
                'Content-Type': 'application/json',
            },
        }
    else:
        if   operation == 'POST':
            
            item = json.loads(event['body'])
            dynamodb = boto3.resource('dynamodb')
            table = dynamodb.Table('ProductoProveedor')
            millis = int(round(time.time() * 1000))
    
            table.put_item(
                Item={
                    'id_producto': millis,
                    "referencia": item.get("referencia"),
                    "nombre": item.get("nombre"),
                    "descripcion": item.get("descripcion"),
                    "dimension": item.get("dimension"),
                    "espacio": item.get("espacio"),
                    "presentacion": item.get("presentacion"),
                    "color": item.get("color"),
                    "categoria": item.get("categoria"),
                    "material": item.get("material"),
                    "estado": item.get("estado"),
                    "fecha_creacion": item.get("fecha_creacion"),
                    "id_tipo_producto_fk": item.get("id_tipo_producto_fk"),
                    "id_proovedor_fk": item.get("id_proovedor_fk")
                }
            )
            
            return {
                'statusCode': '200',
                'body': json.dumps({"resp":"Inserción exitosa - método: "+ operation+" id creado: "+str(millis) }),
                'headers': {
                'Content-Type': 'application/json',
            },
  }
    
    
    return 'Terminado'