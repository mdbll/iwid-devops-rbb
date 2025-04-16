import os
import boto3
import json
from boto3.dynamodb.conditions import Key
from boto3.dynamodb.types import TypeDeserializer
import decimal

def convert_decimals(obj):
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        if obj % 1 == 0:
            return int(obj)
        else:
            return float(obj)
    else:
        return obj

def handler(event, context):
  print('Table name')
  print(os.environ["STORAGE_ADDRESSES_NAME"])
  
  deserializer = TypeDeserializer()
  dynamodb = boto3.resource('dynamodb')
  dbtable = dynamodb.Table(os.environ["STORAGE_ADDRESSES_NAME"])
  
  try:
    user_id = event.get("requestContext", {}).get("identity", {}).get("cognitoAuthenticationProvider", "").split(':')[-1]
    res = dbtable.query(
        IndexName="user_ids",
        KeyConditionExpression=Key('user_id').eq(user_id),
    )
    
    print('Response')
    print(res)

    items = res['Items']
    print('Items')
    print(items)

    cleaned_items = convert_decimals(items)
    print('cleaned_items')
    print(cleaned_items)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'message': 'Items crawled', 'items': cleaned_items})
    }
  except Exception as e:
    print('500')
    print(str(e))
    return {
        'statusCode': 500,
        'body': json.dumps({'error': str(e)})
    }