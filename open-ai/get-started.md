## testing

```bash
export RG='open-ai'
export OPENAI_NAME='briar-openai-ext'

az cognitiveservices account create \
    -n $OPENAI_NAME \
    -g $RG \
    -l eastus \
    --kind OpenAI \
    --sku s0 

export OPENAI_ENDPOINT=$(az cognitiveservices account show -n $OPENAI_NAME -g $RG -o json | jq -r .properties.endpoint)
export OPENAI_KEY=$(az cognitiveservices account keys list -n $OPENAI_NAME -g $RG -o json | jq -r .key1)

az cognitiveservices account deployment create \
   -g $RG \
   -n $OPENAI_NAME \
   --deployment-name my-model \
   --model-name text-curie-001 \
   --model-version "1"  \
   --model-format OpenAI \
   --scale-settings-scale-type "Standard"



```