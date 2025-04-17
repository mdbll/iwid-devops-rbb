import os
import boto3
import json
from boto3.dynamodb.conditions import Key


def handler(event, context):
  print('received event:')
  print(event)

  dynamodb = boto3.resource('dynamodb')
  dbtable = dynamodb.Table(os.environ["STORAGE_ADDRESSES_NAME"])
  
  try:
    body = json.loads(event["body"])
    print('body')
    print(body)

    address_id = json.loads(body)["id"]
    print('address_id')
    print(address_id)



    r = dbtable.delete_item(Key={'id': address_id})

    print('response')
    print(r)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'message': 'Item deleted'})
    }
  
  except Exception as e:
    print('500')
    print(str(e))
    return {
        'statusCode': 500,
        'body': json.dumps({'error': str(e)})
    }