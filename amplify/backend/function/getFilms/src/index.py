import os
import boto3
import json
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.types import TypeDeserializer

def handler(event, context):
  print('Table name')
  print(os.environ["STORAGE_FILMS_NAME"])
  
  dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
  dbtable = dynamodb.Table(os.environ["STORAGE_FILMS_NAME"])
  
  try:
    res = dbtable.scan()
    items = res.get('Items', [])

    print('Items')
    print(items)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'message': 'Items crawled', 'items': items})
    }
  except Exception as e:
    print('500')
    print(str(e))
    return {
        'statusCode': 500,
        'body': json.dumps({'error': str(e)})
    }