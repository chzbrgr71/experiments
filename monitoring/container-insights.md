## AKS with Container Insights

```bash
export RG=aks
export CLUSTERNAME=briar-aks-test
export K8SVERSION=1.26.3
export NODECOUNT=5
export LOCATION=eastus
export WORKSPACENAME=briarloganalytics

az group create --name $RG --location $LOCATION

# deploy log analytics workspace
az monitor log-analytics workspace create -g $RG -n $WORKSPACENAME

WORKSPACEID=$(az monitor log-analytics workspace show --resource-group $RG --workspace-name $WORKSPACENAME --query id -o tsv)

# deploy AKS
az aks create \
    --resource-group $RG \
    --name $CLUSTERNAME \
    --node-count $NODECOUNT \
    --kubernetes-version $K8SVERSION \
    --network-plugin kubenet \
    --enable-addons monitoring \
    --workspace-resource-id $WORKSPACEID \
    --location $LOCATION

az aks get-credentials -n $CLUSTERNAME -g $RG
```
