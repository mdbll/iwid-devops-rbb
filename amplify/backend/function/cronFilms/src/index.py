import json
import os
import boto3
import uuid
import requests

def handler(event, context):
    print('Fetching trending movies...')
    url = "https://ghibliapi.vercel.app/films"
    print(os.environ["STORAGE_FILMS_NAME"])

    try:
        dynamodb = boto3.resource('dynamodb')
        dbtable = dynamodb.Table(os.environ["STORAGE_FILMS_NAME"])

        movies_data = dbtable.scan()
        movies = movies_data.get('Items', [])
        with dbtable.batch_writer() as batch:
            for item in movies:
                batch.delete_item(Key={'id': item['id']}) 

        response = requests.get(url)
        data = response.json()

        for movie in data:
            print(f"{json.dumps(movie)} movies fetched.")
            r = dbtable.put_item(
             Item={
                **movie,
                "id": str(uuid.uuid4()),
            })
        
        return {
            'statusCode': 200,
            'message': 'Films added'
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
