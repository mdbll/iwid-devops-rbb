import os
import boto3
import json

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    dbtable = dynamodb.Table(os.environ["STORAGE_USERS_NAME"])

    print('received event:')
    print(event)
    
    try:
        r = dbtable.put_item(Item=event)
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
