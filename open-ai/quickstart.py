import os
import requests
import json
import openai

openai.api_key = os.getenv("OPENAI_KEY")
openai.api_base = os.getenv("OPENAI_ENDPOINT")
openai.api_type = 'azure'
openai.api_version = '2023-05-15'

deployment_name='my-model' 

# Send a completion call to generate an answer
print('Sending a test completion job')
start_phrase = 'Write a tagline for an ice cream shop. '
response = openai.Completion.create(engine=deployment_name, prompt=start_phrase, max_tokens=10)
text = response['choices'][0]['text'].replace('\n', '').replace(' .', '.').strip()
print(start_phrase+text)