import os
import boto3
import json
from dynamodb_json import json_util as dbjson
from boto3.dynamodb.conditions import Key

def handler(event, context):
  print('Table name')
  print(os.environ["STORAGE_USERS_NAME"])
  
  dynamodb = boto3.resource('dynamodb')
  dbtable = dynamodb.Table(os.environ["STORAGE_USERS_NAME"])
  
  try:
    id = event.get("requestContext", {}).get("identity", {}).get("cognitoAuthenticationProvider", "").split(':')[-1]
    res = dbtable.query( 
        KeyConditionExpression=Key('id').eq(id)
        )
    
    item = res['Items'][0]

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