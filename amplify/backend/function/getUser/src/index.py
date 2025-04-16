import os
import boto3
import json
from dynamodb_json import json_util as dbjson

def handler(event, context):
  dynamodb = boto3.resource('dynamodb')
  dbtable = dynamodb.Table(os.environ["STORAGE_USERS_NAME"])

  print('received event:')
  print(event)
  
  print('context')
  print(context)
  
  try:
    res = dbtable.query( 
        IndexName='email',
        KeyConditionExpression=Key('email').eq(event)
        )
    print(res)
    item = res['Item']
    print(item)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'message': 'Item crawled', 'item': item})
    }
  except Exception as e:
    print('500')
    print(str(e))
    return {
        'statusCode': 500,
        'body': json.dumps({'error': str(e)})
    }