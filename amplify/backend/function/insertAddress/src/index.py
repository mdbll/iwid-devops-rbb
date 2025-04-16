import os
import boto3
import json
import uuid

def handler(event, context):
  print('received event:')
  print(event)

  dynamodb = boto3.resource('dynamodb')
  dbtable = dynamodb.Table(os.environ["STORAGE_ADDRESSES_NAME"])
  
  try:
    user_id = event.get("requestContext", {}).get("identity", {}).get("cognitoAuthenticationProvider", "").split(':')[-1]
    body = json.loads(event["body"])
    print('body')
    print(body)
    r = dbtable.put_item(
            Item={
                **json.loads(body),
                "id": str(uuid.uuid4()),
                "user_id": user_id
            })
    print('response')
    print(r)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({'message': 'Item inserted', 'item': event})
    }
  
  except Exception as e:
    print('500')
    print(str(e))
    return {
        'statusCode': 500,
        'body': json.dumps({'error': str(e)})
    }